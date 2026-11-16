import { useState } from 'react';
import { Monitor, Palette, Info, Sun, Moon, Volume2, Wifi, Bluetooth, Battery, Check, Laptop } from 'lucide-react';
import { WALLPAPERS } from '../wallpapers';

const SECTIONS = [
  { id: 'system', name: 'System', icon: Monitor },
  { id: 'personalization', name: 'Personalization', icon: Palette },
  { id: 'about', name: 'About', icon: Info },
];

const ACCENTS = ['#0078d4', '#6d5bd0', '#0f9d76', '#e07b00', '#d13438', '#c239b3'];

export default function SettingsApp({ win, settings, setSetting, toggleSetting }) {
  const [section, setSection] = useState(win?.payload?.section || 'system');

  return (
    <div className="settings">
      <aside className="set-nav">
        <div className="set-nav-head">
          <span className="avatar">AT</span>
          <span>Alex Turner</span>
        </div>
        {SECTIONS.map((entry) => (
          <button
            key={entry.id}
            type="button"
            className={`set-link${section === entry.id ? ' active' : ''}`}
            onClick={() => setSection(entry.id)}
          >
            <entry.icon size={16} aria-hidden="true" />
            <span>{entry.name}</span>
          </button>
        ))}
      </aside>

      <div className="set-body">
        {section === 'system' && (
          <>
            <h2 className="set-h1">System</h2>
            <div className="set-group">
              <div className="set-row">
                <Sun size={18} className="row-ico" aria-hidden="true" />
                <div className="grow">
                  <b>Display brightness</b>
                  <small>{settings.brightness}%</small>
                </div>
                <input
                  type="range"
                  className="set-range"
                  min="30"
                  max="100"
                  value={settings.brightness}
                  style={{ '--fill': `${((settings.brightness - 30) / 70) * 100}%` }}
                  onChange={(event) => setSetting('brightness', Number(event.target.value))}
                  aria-label="Display brightness"
                />
              </div>
              <div className="set-row">
                <Moon size={18} className="row-ico" aria-hidden="true" />
                <div className="grow">
                  <b>Night light</b>
                  <small>Warm the display for the evening</small>
                </div>
                <button
                  type="button"
                  className={`switch${settings.toggles.nightlight ? ' on' : ''}`}
                  onClick={() => toggleSetting('nightlight')}
                  aria-label="Night light"
                  aria-pressed={settings.toggles.nightlight}
                />
              </div>
            </div>

            <div className="set-group">
              <div className="set-row">
                <Volume2 size={18} className="row-ico" aria-hidden="true" />
                <div className="grow">
                  <b>Volume</b>
                  <small>{settings.volume}%</small>
                </div>
                <input
                  type="range"
                  className="set-range"
                  min="0"
                  max="100"
                  value={settings.volume}
                  style={{ '--fill': `${settings.volume}%` }}
                  onChange={(event) => setSetting('volume', Number(event.target.value))}
                  aria-label="Volume"
                />
              </div>
              <div className="set-row">
                <Wifi size={18} className="row-ico" aria-hidden="true" />
                <div className="grow">
                  <b>Wi-Fi</b>
                  <small>{settings.toggles.wifi ? 'Connected to Potential-5G' : 'Disconnected'}</small>
                </div>
                <button
                  type="button"
                  className={`switch${settings.toggles.wifi ? ' on' : ''}`}
                  onClick={() => toggleSetting('wifi')}
                  aria-label="Wi-Fi"
                  aria-pressed={settings.toggles.wifi}
                />
              </div>
              <div className="set-row">
                <Bluetooth size={18} className="row-ico" aria-hidden="true" />
                <div className="grow">
                  <b>Bluetooth</b>
                  <small>{settings.toggles.bluetooth ? 'On' : 'Off'}</small>
                </div>
                <button
                  type="button"
                  className={`switch${settings.toggles.bluetooth ? ' on' : ''}`}
                  onClick={() => toggleSetting('bluetooth')}
                  aria-label="Bluetooth"
                  aria-pressed={settings.toggles.bluetooth}
                />
              </div>
            </div>
          </>
        )}

        {section === 'personalization' && (
          <>
            <h2 className="set-h1">Personalization</h2>
            <div className="set-group padded">
              <b className="group-title">Theme</b>
              <div className="theme-cards">
                {['light', 'dark'].map((theme) => (
                  <button
                    key={theme}
                    type="button"
                    className={`theme-card${settings.theme === theme ? ' selected' : ''}`}
                    onClick={() => setSetting('theme', theme)}
                    aria-pressed={settings.theme === theme}
                    aria-label={`${theme === 'light' ? 'Light' : 'Dark'} theme`}
                  >
                    <span className={`theme-preview ${theme}`} aria-hidden="true" />
                    <span>
                      {theme === 'light' ? 'Light' : 'Dark'}
                      {settings.theme === theme && <Check size={13} aria-hidden="true" />}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="set-group padded">
              <b className="group-title">Accent color</b>
              <div className="swatches">
                {ACCENTS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`swatch${settings.accent === color ? ' selected' : ''}`}
                    style={{ background: color }}
                    onClick={() => setSetting('accent', color)}
                    aria-label={`Accent color ${color}`}
                    aria-pressed={settings.accent === color}
                  />
                ))}
              </div>
            </div>

            <div className="set-group padded">
              <b className="group-title">Background</b>
              <div className="wall-grid">
                {WALLPAPERS.map((wallpaper) => (
                  <button
                    key={wallpaper.id}
                    type="button"
                    className={`wall-card${settings.wallpaper === wallpaper.id ? ' selected' : ''}`}
                    onClick={() => setSetting('wallpaper', wallpaper.id)}
                    aria-pressed={settings.wallpaper === wallpaper.id}
                    aria-label={`Wallpaper ${wallpaper.name}`}
                  >
                    <span className={`wall-thumb wallpaper-${wallpaper.id}`}>
                      <span className="wall-label">{wallpaper.name}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {section === 'about' && (
          <>
            <h2 className="set-h1">About</h2>
            <div className="set-group">
              <div className="set-row">
                <Laptop size={18} className="row-ico" aria-hidden="true" />
                <div className="grow">
                  <b>POTENTIAL-PC</b>
                  <small>Potential-OS 11 · build 21996</small>
                </div>
              </div>
              <div className="set-row">
                <div className="grow">
                  <b>Processor</b>
                  <small>Potential Silicon P1 · 8 cores</small>
                </div>
              </div>
              <div className="set-row">
                <div className="grow">
                  <b>Installed RAM</b>
                  <small>32.0 GB</small>
                </div>
              </div>
              <div className="set-row">
                <div className="grow">
                  <b>Storage</b>
                  <small>1 TB SSD</small>
                </div>
              </div>
              <div className="set-row">
                <div className="grow">
                  <b>Battery</b>
                  <small>
                    <Battery size={12} style={{ verticalAlign: '-2px', marginRight: 4 }} aria-hidden="true" />
                    84% · 6h 12m remaining
                  </small>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
