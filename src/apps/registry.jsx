import { Folder, FileText, Calculator as CalculatorIcon, Settings as SettingsIcon, Image as ImageIcon, Terminal as TerminalIcon } from 'lucide-react';
import FileExplorer from './FileExplorer';
import Notepad from './Notepad';
import Calculator from './Calculator';
import SettingsApp from './Settings';
import Photos from './Photos';
import TerminalApp from './Terminal';

export const APPS = [
  { id: 'explorer', name: 'File Explorer', icon: Folder, color: '#ffcf5c', component: FileExplorer, pinned: true, size: { w: 920, h: 580 } },
  { id: 'notepad', name: 'Notepad', icon: FileText, color: '#8fe3b0', component: Notepad, pinned: true, size: { w: 720, h: 520 } },
  { id: 'calculator', name: 'Calculator', icon: CalculatorIcon, color: '#7fd4ff', component: Calculator, pinned: true, size: { w: 360, h: 540 } },
  { id: 'photos', name: 'Photos', icon: ImageIcon, color: '#f7a4d0', component: Photos, pinned: true, size: { w: 880, h: 580 } },
  { id: 'terminal', name: 'Terminal', icon: TerminalIcon, color: '#c9d4e3', component: TerminalApp, pinned: true, size: { w: 760, h: 480 } },
  { id: 'settings', name: 'Settings', icon: SettingsIcon, color: '#b9c6d8', component: SettingsApp, pinned: true, size: { w: 900, h: 600 } },
];

export const DESKTOP_APPS = ['explorer', 'photos', 'notepad', 'calculator', 'terminal', 'settings'];
