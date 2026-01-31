import { useState, useEffect } from 'react';
import { MdAdd, MdSearch, MdSettings, MdDescription, MdDelete, MdEdit, MdClose } from 'react-icons/md';
import { getAllVertraege, searchVertraege, deleteVertrag, type StoredVertrag } from '../services/storage';

interface Props {
  onCreateNew: () => void;
  onEdit: (id: string) => void;
  onSettings: () => void;
}

export function Dashboard({ onCreateNew, onEdit, onSettings }: Props) {
  const [vertraege, setVertraege] = useState<StoredVertrag[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

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
                    className="vertrag-action-btn delete"
                    onClick={() => setDeleteConfirm(vertrag.id)}
                  >
                    <MdDelete size={18} />
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
      <button className="fab" onClick={onCreateNew} title="Neuen Mietvertrag erstellen">
        <MdAdd size={28} />
      </button>
    </div>
  );
}
