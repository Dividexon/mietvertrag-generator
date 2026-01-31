import { useState } from 'react';
import { MdSearch, MdClose } from 'react-icons/md';
import { getAllVertraege, type StoredVertrag } from '../services/storage';

interface Props {
  currentVertrag: {
    bezeichnung: string;
    adresse: string;
  };
  onSelect: (id: string) => void;
}

export function VertragSelector({ currentVertrag, onSelect }: Props) {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [vertraege, setVertraege] = useState<StoredVertrag[]>([]);

  const handleOpenSearch = () => {
    setVertraege(getAllVertraege());
    setShowSearch(true);
  };

  const handleClose = () => {
    setShowSearch(false);
    setSearchQuery('');
  };

  const handleSelect = (id: string) => {
    onSelect(id);
    handleClose();
  };

  const filteredVertraege = searchQuery.trim()
    ? vertraege.filter(v =>
        v.bezeichnung.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.adresse.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.mieter.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : vertraege;

  return (
    <>
      {/* Selector Card */}
      <div className="vertrag-selector-card" onClick={handleOpenSearch}>
        <div className="vertrag-selector-content">
          <span className="vertrag-selector-label">Vertrag auswählen</span>
          <span className="vertrag-selector-title">
            {currentVertrag.bezeichnung || 'Neuer Mietvertrag'}
          </span>
          <span className="vertrag-selector-subtitle">
            {currentVertrag.adresse || 'Noch keine Adresse'}
          </span>
        </div>
        <button className="vertrag-selector-btn">
          <MdSearch size={24} />
        </button>
      </div>

      {/* Search Modal */}
      {showSearch && (
        <div className="search-modal-overlay" onClick={handleClose}>
          <div className="search-modal" onClick={e => e.stopPropagation()}>
            <div className="search-modal-header">
              <h2>Vertrag auswählen</h2>
              <button className="search-modal-close" onClick={handleClose}>
                <MdClose size={24} />
              </button>
            </div>
            
            <div className="search-modal-input">
              <MdSearch size={20} />
              <input
                type="text"
                placeholder="Suchen..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>

            <div className="search-modal-list">
              {filteredVertraege.length === 0 ? (
                <div className="search-modal-empty">
                  {vertraege.length === 0 
                    ? 'Keine gespeicherten Verträge' 
                    : 'Keine Treffer'}
                </div>
              ) : (
                filteredVertraege.map(v => (
                  <button
                    key={v.id}
                    className="search-modal-item"
                    onClick={() => handleSelect(v.id)}
                  >
                    <div className="search-modal-item-content">
                      <span className="search-modal-item-title">{v.bezeichnung}</span>
                      <span className="search-modal-item-subtitle">{v.adresse}</span>
                    </div>
                    <span className="search-modal-item-badge">
                      {v.vertragsart === 'wohnraum' ? 'Wohnraum' :
                       v.vertragsart === 'gewerbe' ? 'Gewerbe' : 'Garage'}
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
