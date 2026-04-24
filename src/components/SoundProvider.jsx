import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSound } from "@/hooks/use-sound";
import { clickSoftSound } from "@/lib/click-soft";
import { hoverTickSound } from "@/lib/hover-tick";
import { notificationPopSound } from "@/lib/notification-pop";

const STORAGE_KEY = "portfolio.sound.enabled";

const noop = () => {};

const SoundContext = createContext({
  enabled: false,
  setEnabled: noop,
  toggleEnabled: noop,
  playClick: noop,
  playHover: noop,
  playPop: noop,
});

const getInitialEnabled = () => {
  if (typeof window === "undefined") return false;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "true") return true;
    if (stored === "false") return false;
  } catch {
    // ignore
  }
  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  return !reduced;
};

export function SoundProvider({ children }) {
  const [enabled, setEnabledState] = useState(getInitialEnabled);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(enabled));
    } catch {
      // ignore
    }
  }, [enabled]);

  const setEnabled = useCallback((value) => setEnabledState(Boolean(value)), []);
  const toggleEnabled = useCallback(() => setEnabledState((v) => !v), []);

  const [playClickRaw] = useSound(clickSoftSound, { volume: 0.45, interrupt: true });
  const [playHoverRaw] = useSound(hoverTickSound, { volume: 0.25, interrupt: true });
  const [playPopRaw] = useSound(notificationPopSound, { volume: 0.55, interrupt: true });

  const playClick = useCallback(() => {
    if (enabled) playClickRaw();
  }, [enabled, playClickRaw]);
  const playHover = useCallback(() => {
    if (enabled) playHoverRaw();
  }, [enabled, playHoverRaw]);
  const playPop = useCallback(() => {
    if (enabled) playPopRaw();
  }, [enabled, playPopRaw]);

  const value = useMemo(
    () => ({ enabled, setEnabled, toggleEnabled, playClick, playHover, playPop }),
    [enabled, setEnabled, toggleEnabled, playClick, playHover, playPop]
  );

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

export function useUiSounds() {
  return useContext(SoundContext);
}
