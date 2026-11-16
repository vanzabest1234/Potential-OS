import { useState } from 'react';
import { APPS, DESKTOP_APPS } from '../apps/registry';

export default function Desktop({ settings, onOpenApp, onContextMenu, onClearMenu }) {
  const [selected, setSelected] = useState(null);
  const icons = DESKTOP_APPS.map((id) => APPS.find((app) => app.id === id)).filter(Boolean);

  return (
    <div className="desktop" onContextMenu={onContextMenu} onPointerDown={onClearMenu}>
      <div className={`wallpaper wallpaper-${settings.wallpaper}`} aria-hidden="true" />

      <div className="desktop-icons">
        {icons.map((app) => {
          const Icon = app.icon;
          return (
            <button
              key={app.id}
              type="button"
              className={`desktop-icon${selected === app.id ? ' selected' : ''}`}
              onClick={(event) => {
                event.stopPropagation();
                setSelected(app.id);
              }}
              onDoubleClick={() => {
                onOpenApp(app.id);
                setSelected(null);
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') onOpenApp(app.id);
              }}
              aria-label={`Open ${app.name}`}
            >
              <span className="desktop-icon-glyph">
                <Icon size={36} />
              </span>
              <span className="desktop-icon-label">{app.name}</span>
            </button>
          );
        })}
      </div>

      {settings.toggles.nightlight && <div className="night-light" aria-hidden="true" />}
      <div
        className="dim"
        aria-hidden="true"
        style={{ opacity: ((100 - settings.brightness) / 100) * 0.6 }}
      />
    </div>
  );
}
