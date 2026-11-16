import { useState } from 'react';

const SAMPLE = `Welcome to Potential-OS

This desktop is a Windows 11 inspired playground running in the browser.

Things worth trying:
- Start menu: click the Start button, search or open a pinned app.
- Personalization: theme, accent color and background change instantly.
- Windows: drag a title bar, resize from the corner, or maximize.
- Terminal: type "help" for a short list of commands.

Files here live in memory only, so nothing is saved between reloads.
`;

export default function Notepad({ win }) {
  const fileName = win?.payload?.file || 'Untitled';
  const [text, setText] = useState(SAMPLE);
  const [saved, setSaved] = useState(true);

  const lines = text.split('\n');
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <div className="notepad">
      <div className="np-menu">
        <button
          type="button"
          onClick={() => {
            setText('');
            setSaved(false);
          }}
        >
          New
        </button>
        <button type="button" onClick={() => setSaved(true)}>
          Save
        </button>
        <button type="button" onClick={() => setSaved(true)}>
          View
        </button>
      </div>

      <textarea
        className="np-area"
        value={text}
        onChange={(event) => {
          setText(event.target.value);
          setSaved(false);
        }}
        spellCheck={false}
        aria-label="Notepad editor"
      />

      <div className="np-status">
        <span>Ln {lines.length}, Col 1</span>
        <span>{words} words</span>
        <span>{fileName}</span>
        <span>{saved ? 'Saved' : 'Unsaved'}</span>
        <span>100%</span>
      </div>
    </div>
  );
}
