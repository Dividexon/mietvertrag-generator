import { MdClose, MdDarkMode, MdLightMode, MdBrightness6, MdDelete } from 'react-icons/md';
import type { ThemeMode } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  onClearAll: () => void;
}

export function SettingsModal({ isOpen, onClose, mode, setMode, onClearAll }: Props) {
  if (!isOpen) return null;

  const handleClearAll = () => {
    if (window.confirm('Wirklich ALLE Mietverträge löschen? Diese Aktion kann nicht rückgängig gemacht werden.')) {
      onClearAll();
      onClose();
    }
  };

  return (
    <div className="settings-modal-overlay" onClick={onClose}>
      <div className="settings-modal" onClick={e => e.stopPropagation()}>
        <div className="settings-modal-header">
          <h2>Einstellungen</h2>
          <button className="settings-modal-close" onClick={onClose}>
            <MdClose size={24} />
          </button>
        </div>

        <div className="settings-modal-content">
          {/* Theme */}
          <div className="settings-section">
            <h3>Erscheinungsbild</h3>
            <div className="settings-theme-options">
              <button
                className={`settings-theme-btn ${mode === 'light' ? 'active' : ''}`}
                onClick={() => setMode('light')}
              >
                <MdLightMode size={24} />
                <span>Hell</span>
              </button>
              <button
                className={`settings-theme-btn ${mode === 'dark' ? 'active' : ''}`}
                onClick={() => setMode('dark')}
              >
                <MdDarkMode size={24} />
                <span>Dunkel</span>
              </button>
              <button
                className={`settings-theme-btn ${mode === 'system' ? 'active' : ''}`}
                onClick={() => setMode('system')}
              >
                <MdBrightness6 size={24} />
                <span>System</span>
              </button>
            </div>
          </div>

          {/* Data */}
          <div className="settings-section">
            <h3>Daten</h3>
            <p className="settings-description">
              Alle Mietverträge werden lokal auf diesem Gerät gespeichert.
            </p>
            <button className="settings-danger-btn" onClick={handleClearAll}>
              <MdDelete size={20} />
              Alle Verträge löschen
            </button>
          </div>

          {/* Info */}
          <div className="settings-section">
            <h3>Info</h3>
            <div className="settings-info">
              <p><strong>Mietvertrag Generator</strong></p>
              <p>Version 2.0</p>
              <p className="settings-muted">Professionelle Mietverträge nach deutschem Mietrecht</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
