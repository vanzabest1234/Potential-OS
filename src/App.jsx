import { useEffect, useState } from 'react';
import { Folder, Palette, Terminal, Monitor } from 'lucide-react';
import Desktop from './components/Desktop';
import Taskbar from './components/Taskbar';
import StartMenu from './components/StartMenu';
import QuickSettings from './components/QuickSettings';
import ContextMenu from './components/ContextMenu';
import Window from './components/Window';
import { useWindows } from './hooks/useWindows';
import { useSettings } from './hooks/useSettings';

export default function App() {
  const { settings, setSetting, toggleSetting } = useSettings();
  const wm = useWindows();
  const [startOpen, setStartOpen] = useState(false);
  const [quickOpen, setQuickOpen] = useState(false);
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setStartOpen(false);
        setQuickOpen(false);
        setMenu(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const openApp = (appId, payload) => {
    setStartOpen(false);
    setQuickOpen(false);
    wm.open(appId, payload);
  };

  const desktopMenuItems = [
    { label: 'Open File Explorer', icon: Folder, onSelect: () => openApp('explorer') },
    { label: 'Open Terminal', icon: Terminal, onSelect: () => openApp('terminal') },
    { label: 'Display settings', icon: Monitor, onSelect: () => openApp('settings', { section: 'system' }) },
    { separator: true },
    { label: 'Personalize', icon: Palette, onSelect: () => openApp('settings', { section: 'personalization' }) },
  ];

  return (
    <div className="os" data-theme={settings.theme} style={{ '--accent': settings.accent }}>
      <Desktop
        settings={settings}
        onOpenApp={openApp}
        onContextMenu={(event) => {
          event.preventDefault();
          setStartOpen(false);
          setQuickOpen(false);
          setMenu({ x: event.clientX, y: event.clientY });
        }}
        onClearMenu={() => setMenu(null)}
      />

      {wm.windows
        .filter((win) => !win.minimized)
        .map((win) => (
          <Window
            key={win.id}
            win={win}
            wm={wm}
            settings={settings}
            setSetting={setSetting}
            toggleSetting={toggleSetting}
            openApp={openApp}
          />
        ))}

      {(startOpen || quickOpen) && (
        <div
          className="popover-backdrop"
          onPointerDown={() => {
            setStartOpen(false);
            setQuickOpen(false);
          }}
        />
      )}

      {startOpen && (
        <StartMenu onOpenApp={openApp} wm={wm} onClose={() => setStartOpen(false)} />
      )}

      {quickOpen && (
        <QuickSettings
          settings={settings}
          onToggle={toggleSetting}
          setSetting={setSetting}
          onOpenSettings={() => openApp('settings', { section: 'system' })}
        />
      )}

      {menu && (
        <ContextMenu x={menu.x} y={menu.y} items={desktopMenuItems} onClose={() => setMenu(null)} />
      )}

      <Taskbar
        windows={wm.windows}
        activeId={wm.activeId}
        onOpenApp={openApp}
        startOpen={startOpen}
        onToggleStart={() => {
          setStartOpen((value) => !value);
          setQuickOpen(false);
          setMenu(null);
        }}
        quickOpen={quickOpen}
        onToggleQuick={() => {
          setQuickOpen((value) => !value);
          setStartOpen(false);
          setMenu(null);
        }}
        onOpenSettings={() => openApp('settings', { section: 'system' })}
      />
    </div>
  );
}
