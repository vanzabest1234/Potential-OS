import { Wifi, Bluetooth, Plane, Moon, Sun, Volume2, Battery, Settings as SettingsIcon } from 'lucide-react';

export default function QuickSettings({ settings, onToggle, setSetting, onOpenSettings }) {
  const tiles = [
    { key: 'wifi', label: settings.toggles.wifi ? 'Wi-Fi' : 'Wi-Fi off', icon: Wifi },
    { key: 'bluetooth', label: 'Bluetooth', icon: Bluetooth },
    { key: 'airplane', label: 'Airplane mode', icon: Plane },
    { key: 'nightlight', label: 'Night light', icon: Moon },
  ];

  return (
    <div className="quick-settings" role="dialog" aria-label="Quick settings">
      <div className="qs-grid">
        {tiles.map((tile) => (
          <button
            key={tile.key}
            type="button"
            className={`qs-tile${settings.toggles[tile.key] ? ' on' : ''}`}
            onClick={() => onToggle(tile.key)}
            aria-pressed={Boolean(settings.toggles[tile.key])}
          >
            <tile.icon size={17} />
            <span>{tile.label}</span>
          </button>
        ))}
      </div>

      <div className="qs-slider">
        <Sun size={16} aria-hidden="true" />
        <input
          type="range"
          min="30"
          max="100"
          value={settings.brightness}
          style={{ '--fill': `${((settings.brightness - 30) / 70) * 100}%` }}
          onChange={(event) => setSetting('brightness', Number(event.target.value))}
          aria-label="Brightness"
        />
      </div>

      <div className="qs-slider">
        <Volume2 size={16} aria-hidden="true" />
        <input
          type="range"
          min="0"
          max="100"
          value={settings.volume}
          style={{ '--fill': `${settings.volume}%` }}
          onChange={(event) => setSetting('volume', Number(event.target.value))}
          aria-label="Volume"
        />
      </div>

      <div className="qs-footer">
        <span className="qs-battery">
          <Battery size={16} aria-hidden="true" /> 84%
        </span>
        <button
          type="button"
          className="qs-icon"
          onClick={onOpenSettings}
          aria-label="All settings"
          title="All settings"
        >
          <SettingsIcon size={16} />
        </button>
        <button
          type="button"
          className="qs-icon"
          onClick={() => setSetting('theme', settings.theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle theme"
          title="Toggle theme"
        >
          {settings.theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </div>
  );
}
