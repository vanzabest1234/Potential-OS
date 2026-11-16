import { useCallback, useMemo, useRef, useState } from 'react';
import { APPS } from '../apps/registry';

let nextId = 1;

export function useWindows() {
  const [windows, setWindows] = useState([]);
  const top = useRef(10);

  const open = useCallback((appId, payload = null) => {
    const app = APPS.find((entry) => entry.id === appId);
    if (!app) return;

    setWindows((prev) => {
      const existing = prev.find((win) => win.appId === appId);
      if (existing) {
        return prev.map((win) =>
          win.id === existing.id
            ? { ...win, minimized: false, z: ++top.current, payload: payload ?? win.payload }
            : win,
        );
      }

      const size = app.size || { w: 820, h: 540 };
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const w = Math.min(size.w, vw - 32);
      const h = Math.min(size.h, vh - 132);
      const step = prev.length % 6;
      const x = Math.max(8, Math.round((vw - w) / 2) + step * 26 - 65);
      const y = Math.max(8, Math.round((vh - h) / 2) - 40 + step * 22);

      return [
        ...prev,
        {
          id: `win-${nextId++}`,
          appId,
          title: app.name,
          payload,
          x,
          y,
          w,
          h,
          z: ++top.current,
          minimized: false,
          maximized: false,
        },
      ];
    });
  }, []);

  const focus = useCallback((id) => {
    setWindows((prev) => prev.map((win) => (win.id === id ? { ...win, minimized: false, z: ++top.current } : win)));
  }, []);

  const close = useCallback((id) => setWindows((prev) => prev.filter((win) => win.id !== id)), []);
  const closeAll = useCallback(() => setWindows([]), []);
  const minimize = useCallback(
    (id) => setWindows((prev) => prev.map((win) => (win.id === id ? { ...win, minimized: true } : win))),
    [],
  );
  const toggleMaximize = useCallback(
    (id) => setWindows((prev) => prev.map((win) => (win.id === id ? { ...win, maximized: !win.maximized } : win))),
    [],
  );
  const move = useCallback(
    (id, x, y) => setWindows((prev) => prev.map((win) => (win.id === id ? { ...win, x, y } : win))),
    [],
  );
  const resize = useCallback(
    (id, w, h) => setWindows((prev) => prev.map((win) => (win.id === id ? { ...win, w, h } : win))),
    [],
  );

  const activeId = useMemo(() => {
    const visible = windows.filter((win) => !win.minimized);
    if (!visible.length) return null;
    return visible.reduce((a, b) => (a.z > b.z ? a : b)).id;
  }, [windows]);

  return { windows, activeId, open, focus, close, closeAll, minimize, toggleMaximize, move, resize };
}
