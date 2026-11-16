import { useRef } from 'react';
import { Minus, Square, Copy, X } from 'lucide-react';
import { APPS } from '../apps/registry';

export default function Window({ win, wm, settings, setSetting, toggleSetting, openApp }) {
  const app = APPS.find((entry) => entry.id === win.appId);
  const ref = useRef(null);
  const active = wm.activeId === win.id;
  const AppBody = app.component;

  const startDrag = (event) => {
    if (event.button !== 0) return;
    wm.focus(win.id);
    if (win.maximized) return;
    const el = ref.current;
    const startX = event.clientX;
    const startY = event.clientY;
    let nextX = win.x;
    let nextY = win.y;

    const onMove = (moveEvent) => {
      nextX = Math.max(-win.w + 140, Math.min(window.innerWidth - 140, win.x + moveEvent.clientX - startX));
      nextY = Math.max(0, Math.min(window.innerHeight - 120, win.y + moveEvent.clientY - startY));
      if (el) {
        el.style.left = `${nextX}px`;
        el.style.top = `${nextY}px`;
      }
    };
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      wm.move(win.id, nextX, nextY);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp, { once: true });
  };

  const startResize = (event) => {
    event.stopPropagation();
    event.preventDefault();
    wm.focus(win.id);
    const el = ref.current;
    const startX = event.clientX;
    const startY = event.clientY;
    let nextW = win.w;
    let nextH = win.h;

    const onMove = (moveEvent) => {
      nextW = Math.max(320, win.w + moveEvent.clientX - startX);
      nextH = Math.max(220, win.h + moveEvent.clientY - startY);
      if (el) {
        el.style.width = `${nextW}px`;
        el.style.height = `${nextH}px`;
      }
    };
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      wm.resize(win.id, nextW, nextH);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp, { once: true });
  };

  return (
    <section
      ref={ref}
      className={`window${win.maximized ? ' max' : ''}${active ? '' : ' inactive'}`}
      style={
        win.maximized
          ? { zIndex: win.z }
          : { left: win.x, top: win.y, width: win.w, height: win.h, zIndex: win.z }
      }
      onPointerDown={() => wm.focus(win.id)}
      aria-label={win.title}
    >
      <header className="titlebar" onPointerDown={startDrag} onDoubleClick={() => wm.toggleMaximize(win.id)}>
        <app.icon size={15} style={{ color: app.color }} aria-hidden="true" />
        <span className="title">{win.title}</span>
        <div className="captions">
          <button
            type="button"
            className="caption"
            aria-label="Minimize"
            onClick={(event) => {
              event.stopPropagation();
              wm.minimize(win.id);
            }}
          >
            <Minus size={15} />
          </button>
          <button
            type="button"
            className="caption"
            aria-label={win.maximized ? 'Restore' : 'Maximize'}
            onClick={(event) => {
              event.stopPropagation();
              wm.toggleMaximize(win.id);
            }}
          >
            {win.maximized ? <Copy size={12} /> : <Square size={12} />}
          </button>
          <button
            type="button"
            className="caption close"
            aria-label="Close"
            onClick={(event) => {
              event.stopPropagation();
              wm.close(win.id);
            }}
          >
            <X size={16} />
          </button>
        </div>
      </header>

      <div className="window-body">
        <AppBody
          win={win}
          settings={settings}
          setSetting={setSetting}
          toggleSetting={toggleSetting}
          openApp={openApp}
          wm={wm}
        />
      </div>

      {!win.maximized && <div className="resize-handle" onPointerDown={startResize} aria-hidden="true" />}
    </section>
  );
}
