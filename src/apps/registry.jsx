import FileExplorer from './FileExplorer';
import Notepad from './Notepad';
import Calculator from './Calculator';
import SettingsApp from './Settings';
import Photos from './Photos';
import TerminalApp from './Terminal';
import {
  FolderIcon,
  NotepadIcon,
  CalculatorIcon,
  PhotosIcon,
  TerminalIcon,
  SettingsIcon,
} from '../components/AppIcon';

export const APPS = [
  { id: 'explorer', name: 'File Explorer', icon: FolderIcon, component: FileExplorer, pinned: true, size: { w: 920, h: 580 } },
  { id: 'notepad', name: 'Notepad', icon: NotepadIcon, component: Notepad, pinned: true, size: { w: 720, h: 520 } },
  { id: 'calculator', name: 'Calculator', icon: CalculatorIcon, component: Calculator, pinned: true, size: { w: 360, h: 540 } },
  { id: 'photos', name: 'Photos', icon: PhotosIcon, component: Photos, pinned: true, size: { w: 880, h: 580 } },
  { id: 'terminal', name: 'Terminal', icon: TerminalIcon, component: TerminalApp, pinned: true, size: { w: 760, h: 480 } },
  { id: 'settings', name: 'Settings', icon: SettingsIcon, component: SettingsApp, pinned: true, size: { w: 900, h: 600 } },
];

export const DESKTOP_APPS = ['explorer', 'photos', 'notepad', 'calculator', 'terminal', 'settings'];
