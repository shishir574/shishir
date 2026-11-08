import { useCallback, useEffect, useRef, useState } from "react";
import { toUserMessage, type ApiResponse } from "@/lib/api/types";

export interface ResourceState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  lastUpdated: number | null;
  source: string;
  stale: boolean;
  reload: () => void;
}

interface UseApiResourceOptions<T> {
  key: string;
  source: string;
  load: (signal: AbortSignal) => Promise<ApiResponse<T>>;
  enabled?: boolean;
}

/**
 * React state adapter for an API client. Consumers get predictable loading,
 * success, empty, stale and error states; presentation never calls fetch.
 */
export function useApiResource<T>({
  key,
  source,
  load,
  enabled = true,
}: UseApiResourceOptions<T>): ResourceState<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const [stale, setStale] = useState(false);
  const [nonce, setNonce] = useState(0);
  const [completedId, setCompletedId] = useState<string | null>(null);
  const requestId = useRef(0);

  const currentId = `${String(key)}:${String(nonce)}`;
  const loading = enabled && completedId !== currentId;

  useEffect(() => {
    if (!enabled) return;

    const controller = new AbortController();
    const currentRequest = requestId.current + 1;
    requestId.current = currentRequest;

    load(controller.signal)
      .then((response) => {
        if (requestId.current !== currentRequest) return;
        setData(response.data);
        setLastUpdated(response.lastUpdated);
        setStale(response.stale);
        setError(null);
        setCompletedId(currentId);
      })
      .catch((caught: unknown) => {
        if (controller.signal.aborted || requestId.current !== currentRequest) return;
        setError(toUserMessage(caught, source));
        setCompletedId(currentId);
      });

    return () => {
      controller.abort();
    };
  }, [enabled, key, nonce, source, load, currentId]);

  const reload = useCallback(() => {
    setNonce((value) => value + 1);
  }, []);

  return { data, loading, error, lastUpdated, source, stale, reload };
}
