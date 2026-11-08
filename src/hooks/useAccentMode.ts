import { useCallback, useEffect, useState } from "react";

export const ACCENT_MODES = [
  { id: "red", label: "SIGNAL RED" },
  { id: "amber", label: "AMBER" },
  { id: "green", label: "TERMINAL" },
] as const;

export type AccentMode = (typeof ACCENT_MODES)[number]["id"];

const STORAGE_KEY = "archive:accent";

function isAccentMode(value: string | null): value is AccentMode {
  return ACCENT_MODES.some((mode) => mode.id === value);
}

function readInitialMode(): AccentMode {
  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    return isAccentMode(stored) ? stored : "red";
  } catch {
    return "red";
  }
}

/**
 * Demonstrates token-level theming without rewriting components. The whole
 * accent system resolves through CSS custom properties.
 */
export function useAccentMode(): {
  mode: AccentMode;
  setMode: (mode: AccentMode) => void;
} {
  const [mode, setModeState] = useState<AccentMode>(readInitialMode);

  useEffect(() => {
    document.documentElement.dataset.accent = mode;
    try {
      window.sessionStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // A blocked storage API must not break the interface.
    }
  }, [mode]);

  const setMode = useCallback((next: AccentMode) => {
    setModeState(next);
  }, []);

  return { mode, setMode };
}
