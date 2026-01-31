import { useState, useEffect } from 'react';
import { MdAdd, MdSearch, MdSettings, MdDescription, MdDelete, MdEdit, MdClose, MdContentCopy } from 'react-icons/md';
import { getAllVertraege, searchVertraege, deleteVertrag, type StoredVertrag } from '../services/storage';

interface Props {
  onCreateNew: (bezeichnung: string) => void;
  onEdit: (id: string) => void;
  onDuplicate: (id: string, bezeichnung: string) => void;
  onSettings: () => void;
}

export function Dashboard({ onCreateNew, onEdit, onDuplicate, onSettings }: Props) {
  const [vertraege, setVertraege] = useState<StoredVertrag[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [showNameModal, setShowNameModal] = useState<{ mode: 'new' | 'duplicate'; id?: string } | null>(null);
  const [vertragName, setVertragName] = useState('');

  useEffect(() => {
    loadVertraege();
  }, []);

  const loadVertraege = () => {
    const all = getAllVertraege();
    setVertraege(all);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setVertraege(searchVertraege(query));
    } else {
      loadVertraege();
    }
  };

  const handleDelete = (id: string) => {
    deleteVertrag(id);
    setDeleteConfirm(null);
    loadVertraege();
  };

  const handleNameSubmit = () => {
    if (!vertragName.trim()) return;
    
    if (showNameModal?.mode === 'new') {
      onCreateNew(vertragName.trim());
    } else if (showNameModal?.mode === 'duplicate' && showNameModal.id) {
      onDuplicate(showNameModal.id, vertragName.trim());
    }
    
    setShowNameModal(null);
    setVertragName('');
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
  };

  const getVertragsartLabel = (art: string) => {
    switch (art) {
      case 'wohnraum': return 'Wohnraum';
      case 'gewerbe': return 'Gewerbe';
      case 'garage': return 'Garage';
      default: return 'Mietvertrag';
    }
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="dashboard-header-content">
          <h1>Mietverträge</h1>
          <p>Verwaltung Ihrer Mietverträge</p>
        </div>
        <div className="dashboard-header-actions">
          <button 
            className="dashboard-header-btn"
            onClick={() => setShowSearch(!showSearch)}
            title="Suchen"
          >
            <MdSearch size={24} />
          </button>
          <button 
            className="dashboard-header-btn"
            onClick={onSettings}
            title="Einstellungen"
          >
            <MdSettings size={24} />
          </button>
        </div>
      </header>

      {/* Search Bar */}
      {showSearch && (
        <div className="search-bar">
          <div className="search-input-wrapper">
            <MdSearch size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Suchen nach Adresse, Mieter..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              autoFocus
            />
            {searchQuery && (
              <button 
                className="search-clear"
                onClick={() => handleSearch('')}
              >
                <MdClose size={20} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Content */}
      <main className="dashboard-content">
        {vertraege.length === 0 ? (
          /* Empty State */
          <div className="empty-state">
            <div className="empty-state-icon">
              <MdDescription size={64} />
            </div>
            <h2>Keine Mietverträge vorhanden.</h2>
            <p>Erstelle deinen ersten Mietvertrag</p>
          </div>
        ) : (
          /* Verträge Liste */
          <div className="vertraege-list">
            {vertraege.map((vertrag) => (
              <div key={vertrag.id} className="vertrag-card">
                <div className="vertrag-card-header">
                  <span className="vertrag-type-badge">
                    {getVertragsartLabel(vertrag.vertragsart)}
                  </span>
                  <span className="vertrag-date">
                    {formatDate(vertrag.updatedAt)}
                  </span>
                </div>
                
                <h3 className="vertrag-title">{vertrag.bezeichnung}</h3>
                <p className="vertrag-address">{vertrag.adresse}</p>
                
                <div className="vertrag-details">
                  <div className="vertrag-detail">
                    <span className="label">Mieter</span>
                    <span className="value">{vertrag.mieter}</span>
                  </div>
                  <div className="vertrag-detail">
                    <span className="label">Gesamtmiete</span>
                    <span className="value highlight">{formatCurrency(vertrag.gesamtmiete)}</span>
                  </div>
                </div>

                <div className="vertrag-actions">
                  <button 
                    className="vertrag-action-btn edit"
                    onClick={() => onEdit(vertrag.id)}
                  >
                    <MdEdit size={18} />
                    Bearbeiten
                  </button>
                  <button 
                    className="vertrag-action-btn duplicate"
                    onClick={() => {
                      setVertragName(`${vertrag.bezeichnung} (Kopie)`);
                      setShowNameModal({ mode: 'duplicate', id: vertrag.id });
                    }}
                  >
                    <MdContentCopy size={18} />
                    Duplizieren
                  </button>
                  <button 
                    className="vertrag-action-btn delete"
                    onClick={() => setDeleteConfirm(vertrag.id)}
                  >
                    <MdDelete size={18} />
                    Löschen
                  </button>
                </div>

                {/* Delete Confirmation */}
                {deleteConfirm === vertrag.id && (
                  <div className="delete-confirm">
                    <p>Wirklich löschen?</p>
                    <div className="delete-confirm-actions">
                      <button onClick={() => setDeleteConfirm(null)}>Abbrechen</button>
                      <button className="confirm" onClick={() => handleDelete(vertrag.id)}>Löschen</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      {/* FAB Button */}
      <button 
        className="fab" 
        onClick={() => {
          setVertragName('');
          setShowNameModal({ mode: 'new' });
        }} 
        title="Neuen Mietvertrag erstellen"
      >
        <MdAdd size={28} />
      </button>

      {/* Name Modal */}
      {showNameModal && (
        <div className="name-modal-overlay">
          <div className="name-modal">
            <h3>{showNameModal.mode === 'new' ? 'Neuer Mietvertrag' : 'Vertrag duplizieren'}</h3>
            <p>Vergib einen Namen für den Vertrag:</p>
            <input
              type="text"
              placeholder="z.B. Wohnung Musterstraße 1"
              value={vertragName}
              onChange={(e) => setVertragName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
              autoFocus
            />
            <div className="name-modal-actions">
              <button 
                className="name-modal-btn cancel"
                onClick={() => {
                  setShowNameModal(null);
                  setVertragName('');
                }}
              >
                Abbrechen
              </button>
              <button 
                className="name-modal-btn confirm"
                onClick={handleNameSubmit}
                disabled={!vertragName.trim()}
              >
                {showNameModal.mode === 'new' ? 'Erstellen' : 'Duplizieren'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
