import { useMemo, useState } from 'react';
import { Search, Power, FileText, Image as ImageIcon } from 'lucide-react';
import { APPS } from '../apps/registry';

const RECOMMENDED = [
  { name: 'readme.txt', meta: 'Recently added', icon: FileText, appId: 'notepad' },
  { name: 'Bloom.png', meta: '2h ago', icon: ImageIcon, appId: 'photos' },
  { name: 'Q4 notes.txt', meta: 'Yesterday', icon: FileText, appId: 'notepad' },
  { name: 'Screenshots', meta: 'Yesterday', icon: ImageIcon, appId: 'photos' },
];

const POWER_ACTIONS = ['Sleep', 'Restart', 'Shut down'];

export default function StartMenu({ onOpenApp, wm, onClose }) {
  const [query, setQuery] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [powerOpen, setPowerOpen] = useState(false);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    const list = APPS.filter((app) => app.name.toLowerCase().includes(term));
    return showAll ? [...list].sort((a, b) => a.name.localeCompare(b.name)) : list;
  }, [query, showAll]);

  const runPower = (action) => {
    setPowerOpen(false);
    if (action === 'Shut down' || action === 'Restart') wm.closeAll();
    onClose();
  };

  return (
    <div className="start-menu" role="dialog" aria-label="Start menu">
      <div className="start-search">
        <label className="field">
          <Search size={15} aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search apps"
            aria-label="Search apps"
            autoFocus
          />
        </label>
      </div>

      <div className="start-body">
        <div className="start-head">
          <span>{showAll ? 'All apps' : 'Pinned'}</span>
          <button type="button" onClick={() => setShowAll((value) => !value)}>
            {showAll ? 'Back' : 'All apps'}
          </button>
        </div>

        {filtered.length === 0 ? (
          <p className="start-empty">No apps match “{query}”.</p>
        ) : showAll ? (
          <div className="all-apps">
            {filtered.map((app) => (
              <button
                key={app.id}
                type="button"
                className="all-app"
                onClick={() => onOpenApp(app.id)}
                aria-label={`Open ${app.name}`}
              >
                <app.icon size={20} strokeWidth={1.6} style={{ color: app.color }} />
                <span>{app.name}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="app-grid">
            {filtered.map((app) => (
              <button
                key={app.id}
                type="button"
                className="app-tile"
                onClick={() => onOpenApp(app.id)}
                aria-label={`Open ${app.name}`}
              >
                <app.icon size={30} strokeWidth={1.5} style={{ color: app.color }} />
                <span>{app.name}</span>
              </button>
            ))}
          </div>
        )}

        <div className="start-head recommended-head">
          <span>Recommended</span>
        </div>
        <div className="rec-grid">
          {RECOMMENDED.map((item) => (
            <button
              key={item.name}
              type="button"
              className="rec-item"
              onClick={() => onOpenApp(item.appId)}
              aria-label={`Open ${item.name}`}
            >
              <item.icon size={18} aria-hidden="true" />
              <span className="rec-text">
                <b>{item.name}</b>
                <small>{item.meta}</small>
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="start-foot">
        <span className="user-chip">
          <span className="avatar">AT</span>
          <span>Alex Turner</span>
        </span>
        <button
          type="button"
          className="power-btn"
          onClick={() => setPowerOpen((value) => !value)}
          aria-label="Power options"
          aria-expanded={powerOpen}
        >
          <Power size={17} />
        </button>
      </div>

      {powerOpen && (
        <div className="power-menu" role="menu">
          {POWER_ACTIONS.map((action) => (
            <button key={action} type="button" role="menuitem" className="menu-item" onClick={() => runPower(action)}>
              <span>{action}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
