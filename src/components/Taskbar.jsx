import { useEffect, useState } from 'react';
import { Search, Wifi, Volume2, Battery, Bell, Plane } from 'lucide-react';
import { APPS } from '../apps/registry';

export default function Taskbar({
  windows,
  activeId,
  onOpenApp,
  startOpen,
  onToggleStart,
  quickOpen,
  onToggleQuick,
  onOpenSettings,
}) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const pinned = APPS.filter((app) => app.pinned);
  const runningIds = windows.map((win) => win.appId);
  const extra = APPS.filter((app) => !app.pinned && runningIds.includes(app.id));
  const ordered = [...pinned, ...extra];
  const windowFor = (id) => windows.find((win) => win.appId === id);

  return (
    <nav className="taskbar" aria-label="Taskbar">
      <div className="taskbar-center">
        <button
          type="button"
          className={`start-button${startOpen ? ' open' : ''}`}
          onClick={onToggleStart}
          aria-label="Start"
          aria-expanded={startOpen}
        >
          <span className="win-logo" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
        </button>

        <button type="button" className="tb-search" onClick={onToggleStart} aria-label="Search">
          <Search size={15} />
          <span>Search</span>
        </button>

        {ordered.map((app) => {
          const win = windowFor(app.id);
          const active = win && win.id === activeId;
          return (
            <button
              key={app.id}
              type="button"
              className={`tb-btn${active ? ' active' : ''}${win ? ' running' : ''}`}
              onClick={() => onOpenApp(app.id)}
              title={app.name}
              aria-label={`Open ${app.name}`}
            >
              <app.icon size={22} strokeWidth={1.6} style={{ color: app.color }} />
              {win && <span className="tb-indicator" aria-hidden="true" />}
            </button>
          );
        })}
      </div>

      <div className="taskbar-tray">
        <button type="button" className="tray-btn" onClick={onOpenSettings} aria-label="Network and sound settings">
          <Wifi size={16} />
        </button>
        <button type="button" className="tray-btn" onClick={onOpenSettings} aria-label="Volume">
          <Volume2 size={16} />
        </button>
        <button type="button" className="tray-btn" onClick={onOpenSettings} aria-label="Battery">
          <Battery size={16} />
        </button>
        <button
          type="button"
          className={`tray-clock${quickOpen ? ' open' : ''}`}
          onClick={onToggleQuick}
          aria-label="Time and notifications"
        >
          <span>{now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
          <span>{now.toLocaleDateString('en-US')}</span>
        </button>
        <button type="button" className="tray-btn" onClick={onToggleQuick} aria-label="Notifications">
          <Bell size={16} />
        </button>
      </div>
    </nav>
  );
}
