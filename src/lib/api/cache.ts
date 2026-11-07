import { ApiError, type ApiResponse, type RateLimitInfo } from "./types";

interface CacheEntry {
  data: unknown;
  timestamp: number;
  expiresAt: number;
  etag: string | null;
  source: string;
  rateLimit?: RateLimitInfo;
}

const cache = new Map<string, CacheEntry>();

export const DEFAULT_TTL_MS = 5 * 60_000;

function readRateLimit(headers: Headers): RateLimitInfo | undefined {
  const limit = headers.get("x-ratelimit-limit");
  const remaining = headers.get("x-ratelimit-remaining");
  const reset = headers.get("x-ratelimit-reset");
  if (!limit && !remaining && !reset) return undefined;

  const resetSeconds = reset ? Number(reset) : Number.NaN;
  return {
    limit: limit ? Number(limit) : null,
    remaining: remaining ? Number(remaining) : null,
    resetAt: Number.isFinite(resetSeconds) ? resetSeconds * 1000 : null,
  };
}

function fromCache<T>(entry: CacheEntry, stale: boolean): ApiResponse<T> {
  return {
    data: entry.data as T,
    lastUpdated: entry.timestamp,
    source: entry.source,
    stale,
    rateLimit: entry.rateLimit,
  };
}

/**
 * Fetch JSON with an in-memory, session-scoped cache.
 *
 * - Conditional requests are attempted when an ETag was exposed.
 * - A stale cache entry is preferred over an error within the same session.
 * - Tokens never enter this layer; it only handles public data.
 */
export async function fetchJson<T>(
  url: string,
  options: {
    signal?: AbortSignal;
    ttlMs?: number;
    headers?: Record<string, string>;
  } = {},
): Promise<ApiResponse<T>> {
  const ttlMs = options.ttlMs ?? DEFAULT_TTL_MS;
  const cached = cache.get(url);

  if (cached && cached.expiresAt > Date.now()) {
    return fromCache<T>(cached, false);
  }

  const headers = new Headers(options.headers);
  headers.set("Accept", "application/json");
  if (cached?.etag) headers.set("If-None-Match", cached.etag);

  let response: Response;
  try {
    response = await fetch(url, { headers, signal: options.signal });
  } catch (error) {
    if (options.signal?.aborted) {
      throw new ApiError("aborted", "Request aborted.", { cause: error });
    }
    if (cached) return fromCache<T>(cached, true);
    throw new ApiError("network", "Network request failed.", { cause: error });
  }

  const rateLimit = readRateLimit(response.headers);

  if (response.status === 304 && cached) {
    const refreshed: CacheEntry = {
      ...cached,
      timestamp: Date.now(),
      expiresAt: Date.now() + ttlMs,
      rateLimit: rateLimit ?? cached.rateLimit,
    };
    cache.set(url, refreshed);
    return fromCache<T>(refreshed, false);
  }

  if (response.status === 403 || response.status === 429) {
    if (cached) return fromCache<T>(cached, true);
    throw new ApiError("rate-limit", "Request rate limit reached.", {
      status: response.status,
      resetAt: rateLimit?.resetAt ?? undefined,
    });
  }

  if (!response.ok) {
    if (cached) return fromCache<T>(cached, true);
    throw new ApiError("http", `HTTP ${String(response.status)}`, {
      status: response.status,
    });
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch (error) {
    if (cached) return fromCache<T>(cached, true);
    throw new ApiError("parse", "Response was not valid JSON.", { cause: error });
  }

  const entry: CacheEntry = {
    data,
    timestamp: Date.now(),
    expiresAt: Date.now() + ttlMs,
    etag: response.headers.get("etag"),
    source: new URL(url).host,
    rateLimit,
  };
  cache.set(url, entry);
  return fromCache<T>(entry, false);
}

/** Test/helper hook: clear the in-memory cache. */
export function clearApiCache(): void {
  cache.clear();
}

export function getApiCacheSize(): number {
  return cache.size;
}
