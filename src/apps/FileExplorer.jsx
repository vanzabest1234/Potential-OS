import { useState } from 'react';
import {
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Folder,
  Home,
  Image as ImageIcon,
  Monitor,
  Music,
  Search,
  Video,
} from 'lucide-react';

const FOLDERS = {
  Home: {
    items: [
      { name: 'Desktop', type: 'folder', to: 'Desktop', modified: '11/14/2026 9:04 AM' },
      { name: 'Downloads', type: 'folder', to: 'Downloads', modified: '11/16/2026 12:02 AM' },
      { name: 'Documents', type: 'folder', to: 'Documents', modified: '11/12/2026 4:31 PM' },
      { name: 'Pictures', type: 'folder', to: 'Pictures', modified: '11/13/2026 7:18 PM' },
      { name: 'Music', type: 'folder', to: 'Music', modified: '10/29/2026 11:44 AM' },
      { name: 'Videos', type: 'folder', to: 'Videos', modified: '11/02/2026 8:02 AM' },
      { name: 'readme.txt', type: 'file', size: '2 KB', modified: '11/16/2026 12:01 AM' },
    ],
  },
  Desktop: {
    items: [
      { name: 'Screenshots', type: 'folder', to: 'Pictures', modified: '11/15/2026 6:40 PM' },
      { name: 'Potential-OS.lnk', type: 'file', size: '1 KB', modified: '11/16/2026 12:00 AM' },
      { name: 'Bloom.png', type: 'file', size: '3.4 MB', modified: '11/13/2026 7:18 PM' },
    ],
  },
  Downloads: {
    items: [
      { name: 'Potential-OS-11.iso', type: 'file', size: '6.1 GB', modified: '11/16/2026 12:02 AM' },
      { name: 'setup-notes.txt', type: 'file', size: '4 KB', modified: '11/14/2026 8:45 AM' },
      { name: 'wallpapers', type: 'folder', to: 'Pictures', modified: '11/15/2026 10:12 PM' },
    ],
  },
  Documents: {
    items: [
      { name: 'Q4 notes.txt', type: 'file', size: '6 KB', modified: '11/12/2026 4:31 PM' },
      { name: 'Roadmap.docx', type: 'file', size: '28 KB', modified: '11/08/2026 2:20 PM' },
      { name: 'Budget.xlsx', type: 'file', size: '41 KB', modified: '11/04/2026 9:15 AM' },
    ],
  },
  Pictures: {
    items: [
      { name: 'Bloom.png', type: 'file', size: '3.4 MB', modified: '11/13/2026 7:18 PM' },
      { name: 'Dusk.png', type: 'file', size: '2.9 MB', modified: '11/13/2026 7:19 PM' },
      { name: 'Screenshots', type: 'folder', to: 'Screenshots', modified: '11/15/2026 6:40 PM' },
    ],
  },
  Screenshots: {
    items: [{ name: 'shot-01.png', type: 'file', size: '820 KB', modified: '11/15/2026 6:40 PM' }],
  },
  Music: {
    items: [{ name: 'Focus mix.mp3', type: 'file', size: '8.2 MB', modified: '10/29/2026 11:44 AM' }],
  },
  Videos: {
    items: [{ name: 'Demo.mp4', type: 'file', size: '62 MB', modified: '11/02/2026 8:02 AM' }],
  },
};

const SIDEBAR = [
  { label: 'Home', target: 'Home', icon: Home },
  { label: 'Gallery', target: 'Pictures', icon: ImageIcon },
  { separator: true },
  { label: 'Desktop', target: 'Desktop', icon: Monitor },
  { label: 'Downloads', target: 'Downloads', icon: Download },
  { label: 'Documents', target: 'Documents', icon: FileText },
  { label: 'Pictures', target: 'Pictures', icon: ImageIcon },
  { label: 'Music', target: 'Music', icon: Music },
  { label: 'Videos', target: 'Videos', icon: Video },
];

const PARENTS = { Screenshots: 'Pictures', Desktop: 'Home', Downloads: 'Home', Documents: 'Home', Pictures: 'Home', Music: 'Home', Videos: 'Home' };

export default function FileExplorer({ openApp }) {
  const [stack, setStack] = useState(['Home']);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState('');

  const path = stack[index];
  const folder = FOLDERS[path] || FOLDERS.Home;
  const rows = folder.items.filter((item) => item.name.toLowerCase().includes(query.trim().toLowerCase()));

  const go = (target) => {
    if (!target) return;
    setStack((prev) => [...prev.slice(0, index + 1), target]);
    setIndex((prev) => prev + 1);
    setSelected(null);
    setQuery('');
  };

  const canBack = index > 0;
  const canForward = index < stack.length - 1;
  const parent = PARENTS[path];

  const openItem = (item) => {
    if (item.type === 'folder') {
      go(item.to);
      return;
    }
    if (item.name.endsWith('.txt')) {
      openApp('notepad', { file: item.name });
    } else if (item.name.endsWith('.png')) {
      openApp('photos');
    }
  };

  return (
    <div className="explorer">
      <aside className="exp-side">
        {SIDEBAR.map((entry, entryIndex) =>
          entry.separator ? (
            <div key={`separator-${entryIndex}`} className="exp-sep" />
          ) : (
            <button
              key={entry.label}
              type="button"
              className={`exp-nav${path === entry.target && entry.label !== 'Gallery' ? ' active' : ''}`}
              onClick={() => go(entry.target)}
            >
              <entry.icon size={15} aria-hidden="true" />
              <span>{entry.label}</span>
            </button>
          ),
        )}
      </aside>

      <div className="exp-main">
        <div className="exp-toolbar">
          <button type="button" className="icon-btn" onClick={() => setIndex(index - 1)} disabled={!canBack} aria-label="Back">
            <ChevronLeft size={16} />
          </button>
          <button type="button" className="icon-btn" onClick={() => setIndex(index + 1)} disabled={!canForward} aria-label="Forward">
            <ChevronRight size={16} />
          </button>
          <button type="button" className="icon-btn" onClick={() => parent && go(parent)} disabled={!parent} aria-label="Up one level">
            <ArrowUp size={16} />
          </button>

          <div className="exp-address" aria-label="Address bar">
            <button type="button" className="crumb" onClick={() => go('Home')}>
              Home
            </button>
            {path !== 'Home' && (
              <>
                <ChevronRight size={12} aria-hidden="true" />
                <span className="crumb current">{path}</span>
              </>
            )}
          </div>

          <label className="exp-search">
            <Search size={13} aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search"
              aria-label="Search this folder"
            />
          </label>
        </div>

        <div className="exp-list">
          <div className="exp-head">
            <span>Name</span>
            <span>Date modified</span>
            <span>Type</span>
            <span>Size</span>
          </div>
          {rows.length === 0 ? (
            <p className="exp-empty">No items match your search.</p>
          ) : (
            rows.map((item) => {
              const isFolder = item.type === 'folder';
              return (
                <button
                  key={item.name}
                  type="button"
                  className={`exp-row${selected === item.name ? ' selected' : ''}`}
                  onClick={() => setSelected(item.name)}
                  onDoubleClick={() => openItem(item)}
                  aria-label={`${isFolder ? 'Folder' : 'File'} ${item.name}`}
                >
                  <span className="exp-name">
                    {isFolder ? (
                      <Folder size={16} style={{ color: '#ffcf5c' }} aria-hidden="true" />
                    ) : (
                      <FileText size={16} style={{ color: 'var(--text-dim)' }} aria-hidden="true" />
                    )}
                    <span>{item.name}</span>
                  </span>
                  <span className="exp-cell">{item.modified}</span>
                  <span className="exp-cell">{isFolder ? 'File folder' : item.name.split('.').pop().toUpperCase() + ' File'}</span>
                  <span className="exp-cell">{isFolder ? '' : item.size}</span>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
