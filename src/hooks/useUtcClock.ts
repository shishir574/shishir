import { useEffect, useState } from "react";
import { formatUtcClock } from "@/lib/formatting/date";

export function useUtcClock(): string {
  const [clock, setClock] = useState(() => formatUtcClock());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setClock(formatUtcClock());
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  return clock;
}
