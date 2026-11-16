import { useEffect, useRef, useState } from 'react';

const PROMPT = 'C:\\Users\\alex>';

const HELP = [
  'Available commands:',
  '  help       Show this list',
  '  dir        List the current directory',
  '  echo <txt> Print text back',
  '  date       Show the current date and time',
  '  whoami     Show the signed-in user',
  '  ver        Show the OS version',
  '  neofetch   Show system information',
  '  cls        Clear the screen',
];

const NEOFETCH = [
  '        ###        alex@potential-pc',
  '        ###        ----------------',
  '        ###        OS: Potential-OS 11',
  '                   Kernel: potential 11.0.21996',
  '                   Shell: psh 1.0',
  '                   Resolution: 1920x1080',
  '                   Theme: Fluent dark',
  '                   CPU: Potential Silicon P1',
  '                   Memory: 8.2 GB / 32 GB',
];

export default function Terminal() {
  const [lines, setLines] = useState([
    { text: 'Potential-OS Terminal [Version 11.0.21996.1]' },
    { text: '(c) Potential-OS. All rights reserved.', dim: true },
    { text: '' },
    { text: 'Type "help" to see available commands.', dim: true },
  ]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [lines]);

  const run = (raw) => {
    const command = raw.trim();
    const lower = command.toLowerCase();

    setLines((prev) => [...prev, { text: `${PROMPT} ${command}` }]);

    if (!command) return;

    if (lower === 'help') {
      setLines((prev) => [...prev, ...HELP.map((text) => ({ text }))]);
    } else if (lower === 'dir') {
      setLines((prev) => [
        ...prev,
        { text: ' Directory of C:\\Users\\alex' },
        { text: '' },
        { text: '11/14/2026  09:04 AM    <DIR>          Desktop' },
        { text: '11/16/2026  12:02 AM    <DIR>          Downloads' },
        { text: '11/12/2026  04:31 PM    <DIR>          Documents' },
        { text: '11/16/2026  12:01 AM             2,048 readme.txt' },
        { text: '               4 File(s)          2,048 bytes' },
      ]);
    } else if (lower === 'cls') {
      setLines([]);
    } else if (lower.startsWith('echo ')) {
      setLines((prev) => [...prev, { text: command.slice(5) }]);
    } else if (lower === 'date') {
      setLines((prev) => [...prev, { text: new Date().toString() }]);
    } else if (lower === 'whoami') {
      setLines((prev) => [...prev, { text: 'potential-pc\\alex' }]);
    } else if (lower === 'ver') {
      setLines((prev) => [...prev, { text: 'Potential-OS [Version 11.0.21996.1]' }]);
    } else if (lower === 'neofetch') {
      setLines((prev) => [...prev, ...NEOFETCH.map((text) => ({ text, accent: true }))]);
    } else {
      setLines((prev) => [
        ...prev,
        { text: `'${command}' is not recognized as an internal or external command.`, dim: true },
      ]);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    run(input);
    setInput('');
  };

  return (
    <div className="terminal" onClick={() => document.getElementById('term-input')?.focus()}>
      <div className="term-out">
        {lines.map((line, index) => (
          <div key={`${index}-${line.text.slice(0, 12)}`} className={`term-line${line.dim ? ' dim' : ''}${line.accent ? ' accent' : ''}`}>
            {line.text}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <form className="term-prompt" onSubmit={onSubmit}>
        <span aria-hidden="true">{PROMPT}</span>
        <input
          id="term-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          aria-label="Terminal command"
          autoComplete="off"
          autoFocus
        />
      </form>
    </div>
  );
}
