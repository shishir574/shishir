export type ApiErrorKind =
  | "network"
  | "http"
  | "rate-limit"
  | "parse"
  | "aborted"
  | "auth";

export class ApiError extends Error {
  readonly kind: ApiErrorKind;
  readonly status?: number;
  readonly resetAt?: number;

  constructor(
    kind: ApiErrorKind,
    message: string,
    options: { status?: number; resetAt?: number; cause?: unknown } = {},
  ) {
    super(message, { cause: options.cause });
    this.name = "ApiError";
    this.kind = kind;
    this.status = options.status;
    this.resetAt = options.resetAt;
  }
}

export interface RateLimitInfo {
  limit: number | null;
  remaining: number | null;
  resetAt: number | null;
}

export interface ApiResponse<T> {
  data: T;
  lastUpdated: number;
  source: string;
  stale: boolean;
  rateLimit?: RateLimitInfo;
}

export function isApiError(value: unknown): value is ApiError {
  return value instanceof ApiError;
}

export function toUserMessage(error: unknown, source: string): string {
  if (isApiError(error)) {
    switch (error.kind) {
      case "rate-limit":
        return `${source} is rate-limiting requests from this browser. Cached data is shown when available; try again later.`;
      case "aborted":
        return "Request cancelled.";
      case "parse":
        return `${source} returned an unexpected response shape. The record could not be displayed.`;
      case "auth":
        return `${source} requires an authorised session.`;
      case "network":
        return `${source} could not be reached. Check the connection and retry.`;
      case "http":
        return `${source} responded with ${error.status ?? "an error"}. Nothing was fabricated in its place.`;
    }
  }
  return `${source} is currently unavailable. The rest of the archive continues to work.`;
}
