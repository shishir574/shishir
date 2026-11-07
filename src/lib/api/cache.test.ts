import { beforeEach, describe, expect, it, vi } from "vitest";
import { clearApiCache, fetchJson } from "@/lib/api/cache";
import { ApiError } from "@/lib/api/types";

function jsonResponse(value: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: new Headers(headers),
    json: () => Promise.resolve(value),
  } as unknown as Response;
}

describe("fetchJson", () => {
  beforeEach(() => {
    clearApiCache();
    vi.unstubAllGlobals();
  });

  it("caches successful responses in memory", async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ value: 1 }));
    vi.stubGlobal("fetch", fetchMock);

    const url = "https://example.com/public-data";
    const first = await fetchJson<{ value: number }>(url);
    const second = await fetchJson<{ value: number }>(url);

    expect(first.data.value).toBe(1);
    expect(second.data.value).toBe(1);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("uses a cached response if the API rate-limits a later request", async () => {
    const url = "https://example.com/rate-limited";
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({ value: 7 }))
      .mockResolvedValueOnce(jsonResponse({ message: "rate limited" }, 403));

    vi.stubGlobal("fetch", fetchMock);
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));

    await fetchJson<{ value: number }>(url);
    vi.setSystemTime(new Date("2026-01-01T00:10:00Z"));
    const stale = await fetchJson<{ value: number }>(url);
    vi.useRealTimers();

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(stale.data.value).toBe(7);
    expect(stale.stale).toBe(true);
  });

  it("throws a typed error when no cache exists", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({ message: "no" }, 429)));

    await expect(fetchJson("https://example.com/unavailable")).rejects.toBeInstanceOf(ApiError);
  });

  it("falls back to cache on network failure", async () => {
    const url = "https://example.com/network";
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({ value: "cached" }))
      .mockRejectedValueOnce(new Error("offline"));

    vi.stubGlobal("fetch", fetchMock);
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));

    await fetchJson(url);
    vi.setSystemTime(new Date("2026-01-01T00:10:00Z"));
    const stale = await fetchJson<{ value: string }>(url);
    vi.useRealTimers();

    expect(stale.data.value).toBe("cached");
    expect(stale.stale).toBe(true);
  });
});
