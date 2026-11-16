import { useEffect, useState } from 'react';

const STORAGE_KEY = 'potential-os:settings:v1';

export const DEFAULT_SETTINGS = {
  theme: 'dark',
  accent: '#0078d4',
  wallpaper: 'bloom',
  brightness: 100,
  volume: 62,
  toggles: { wifi: true, bluetooth: true, airplane: false, nightlight: false },
};

function readStored() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_SETTINGS,
      ...parsed,
      toggles: { ...DEFAULT_SETTINGS.toggles, ...(parsed.toggles || {}) },
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function useSettings() {
  const [settings, setSettings] = useState(readStored);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      /* storage is optional */
    }
  }, [settings]);

  const setSetting = (key, value) => setSettings((prev) => ({ ...prev, [key]: value }));
  const toggleSetting = (key) =>
    setSettings((prev) => ({ ...prev, toggles: { ...prev.toggles, [key]: !prev.toggles[key] } }));

  return { settings, setSetting, toggleSetting };
}
