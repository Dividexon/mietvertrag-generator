import { MdLightMode, MdDarkMode, MdDevices } from 'react-icons/md';
import type { ThemeMode } from '../types';

interface Props {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

export function ThemeToggle({ mode, setMode }: Props) {
  return (
    <div className="theme-toggle">
      <button
        onClick={() => setMode('light')}
        className={mode === 'light' ? 'active' : ''}
        title="Light Mode"
      >
        <MdLightMode />
      </button>
      <button
        onClick={() => setMode('dark')}
        className={mode === 'dark' ? 'active' : ''}
        title="Dark Mode"
      >
        <MdDarkMode />
      </button>
      <button
        onClick={() => setMode('system')}
        className={mode === 'system' ? 'active' : ''}
        title="System"
      >
        <MdDevices />
      </button>
    </div>
  );
}
