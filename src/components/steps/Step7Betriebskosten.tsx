import { MdChevronLeft, MdChevronRight, MdAdd, MdDelete } from 'react-icons/md';
import type { Mietvertrag, Betriebskosten, Abrechnungsschluessel } from '../../types';
import { BETRIEBSKOSTEN_LABELS, ABRECHNUNGSSCHLUESSEL_LABELS } from '../../types';

interface Props {
  vertrag: Mietvertrag;
  toggleBetriebskosten: (key: keyof Omit<Betriebskosten, 'sonstige'>) => void;
  updateBetriebskostenSchluessel: (key: keyof Omit<Betriebskosten, 'sonstige'>, schluessel: string) => void;
  addSonstigeBetriebskosten: () => void;
  removeSonstigeBetriebskosten: (index: number) => void;
  updateSonstigeBetriebskosten: (index: number, data: { bezeichnung?: string; schluessel?: Abrechnungsschluessel }) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Step7Betriebskosten({ 
  vertrag, 
  toggleBetriebskosten, 
  updateBetriebskostenSchluessel,
  addSonstigeBetriebskosten,
  removeSonstigeBetriebskosten,
  updateSonstigeBetriebskosten,
  onNext, 
  onPrev 
}: Props) {
  const { betriebskosten } = vertrag;
  
  const bkKeys = Object.keys(BETRIEBSKOSTEN_LABELS) as (keyof Omit<Betriebskosten, 'sonstige'>)[];
  const activeCount = bkKeys.filter(key => betriebskosten[key].aktiv).length + betriebskosten.sonstige.length;

  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>§7 Betriebskosten</h2>
        </div>
        <div className="card-content">
          <p style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>
            Neben der Grundmiete sind vom Mieter nachstehende Betriebskosten zu tragen.
            Wählen Sie alle umlagefähigen Kosten aus und bestimmen Sie den Abrechnungsschlüssel.
          </p>
          <p style={{ color: 'var(--accent)', fontWeight: 500, marginBottom: '20px' }}>
            Aktiv: {activeCount} Positionen
          </p>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>Betriebskostenpositionen (a-z)</h2>
        </div>
        <div className="card-content">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {bkKeys.map((key) => {
              const bk = betriebskosten[key];
              const label = BETRIEBSKOSTEN_LABELS[key];
              
              return (
                <div 
                  key={key}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '24px 1fr 220px',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    background: bk.aktiv ? 'var(--accent-light)' : 'var(--bg-input)',
                    border: `1px solid ${bk.aktiv ? 'var(--accent)' : 'var(--border-color)'}`,
                    borderRadius: '12px',
                    transition: 'all 0.2s',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={bk.aktiv}
                    onChange={() => toggleBetriebskosten(key)}
                    style={{ 
                      width: '20px', 
                      height: '20px', 
                      accentColor: 'var(--accent)',
                      cursor: 'pointer',
                    }}
                  />
                  <span style={{ 
                    fontSize: '0.95rem',
                    color: bk.aktiv ? 'var(--text-primary)' : 'var(--text-secondary)',
                  }}>
                    {label}
                  </span>
                  <select
                    value={bk.schluessel}
                    onChange={(e) => updateBetriebskostenSchluessel(key, e.target.value as Abrechnungsschluessel)}
                    disabled={!bk.aktiv}
                    style={{
                      padding: '6px 10px',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)',
                      background: bk.aktiv ? 'var(--bg-secondary)' : 'var(--bg-input)',
                      color: bk.aktiv ? 'var(--text-primary)' : 'var(--text-muted)',
                      fontSize: '0.85rem',
                      textAlign: 'center',
                      textAlignLast: 'center',
                      opacity: bk.aktiv ? 1 : 0.5,
                      cursor: bk.aktiv ? 'pointer' : 'not-allowed',
                    }}
                  >
                    <option value="">Schlüssel wählen</option>
                    {Object.entries(ABRECHNUNGSSCHLUESSEL_LABELS).map(([value, text]) => (
                      <option key={value} value={value}>{value} - {text}</option>
                    ))}
                  </select>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sonstige Betriebskosten */}
      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>Sonstige Betriebskosten</h2>
        </div>
        <div className="card-content">
          <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Hier können Sie weitere umlagefähige Kosten hinzufügen.
          </p>
          
          {betriebskosten.sonstige.map((item, index) => (
            <div 
              key={index}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 220px 44px',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                background: 'var(--accent-light)',
                border: '1px solid var(--accent)',
                borderRadius: '12px',
                marginBottom: '8px',
              }}
            >
              <input
                type="text"
                value={item.bezeichnung}
                onChange={(e) => updateSonstigeBetriebskosten(index, { bezeichnung: e.target.value })}
                placeholder="z.B. Schwimmbad, Sauna..."
                style={{
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem',
                }}
              />
              <select
                value={item.schluessel}
                onChange={(e) => updateSonstigeBetriebskosten(index, { schluessel: e.target.value as Abrechnungsschluessel })}
                style={{
                  padding: '6px 10px',
                  borderRadius: '8px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.85rem',
                  textAlign: 'center',
                  textAlignLast: 'center',
                }}
              >
                <option value="">Schlüssel wählen</option>
                {Object.entries(ABRECHNUNGSSCHLUESSEL_LABELS).map(([value, text]) => (
                  <option key={value} value={value}>{value} - {text}</option>
                ))}
              </select>
              <button
                onClick={() => removeSonstigeBetriebskosten(index)}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'var(--error)',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title="Entfernen"
              >
                <MdDelete size={20} />
              </button>
            </div>
          ))}
          
          <button 
            className="add-mieter-btn" 
            onClick={addSonstigeBetriebskosten}
            style={{ marginTop: betriebskosten.sonstige.length > 0 ? '8px' : '0' }}
          >
            <MdAdd size={24} />
            Sonstige Kosten hinzufügen
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>Abrechnungsschlüssel - Legende</h2>
        </div>
        <div className="card-content">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '8px',
            fontSize: '0.9rem',
          }}>
            {Object.entries(ABRECHNUNGSSCHLUESSEL_LABELS).map(([value, text]) => (
              <div 
                key={value}
                style={{ 
                  display: 'flex', 
                  gap: '8px',
                  color: 'var(--text-secondary)',
                }}
              >
                <span style={{ 
                  fontWeight: 600, 
                  color: 'var(--accent)',
                  minWidth: '20px',
                }}>
                  {value}
                </span>
                <span>= {text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="nav-buttons">
        <button className="btn btn-secondary btn-back" onClick={onPrev}>
          <MdChevronLeft size={20} />
          Zurück
        </button>
        <button className="btn btn-primary btn-next" onClick={onNext}>
          Weiter zu Zahlung
          <MdChevronRight size={20} />
        </button>
      </div>
    </>
  );
}
