# Potential-OS

A Windows 11 inspired desktop that runs in the browser: acrylic taskbar, centered
Start menu, draggable/resizable windows, quick settings, and a small set of apps
(File Explorer, Notepad, Calculator, Photos, Terminal, Settings).

Built with React + Vite.

## Run locally

```bash
npm install
npm run dev
```

The dev server listens on `http://localhost:5173`.

## Apps

- **Settings → Personalization** changes theme, accent color and wallpaper live.
- **Quick settings** (taskbar clock/tray) toggles Wi-Fi, Bluetooth, airplane mode,
  night light, brightness and volume.
- **Terminal** understands `help`, `dir`, `echo`, `date`, `whoami`, `ver`, `neofetch`, `cls`.
- Desktop and Start menu app shortcuts open the same single-instance windows.
