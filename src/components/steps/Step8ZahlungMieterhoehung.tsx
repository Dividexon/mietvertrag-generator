import { MdChevronLeft, MdChevronRight, MdAdd, MdDelete, MdWarning } from 'react-icons/md';
import type { Mietvertrag, MieterhoehungTyp } from '../../types';

interface Props {
  vertrag: Mietvertrag;
  updateVertrag: (section: keyof Mietvertrag, data: any) => void;
  addStaffel: () => void;
  removeStaffel: (index: number) => void;
  updateStaffel: (index: number, data: { datum?: string; betrag?: number }) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Step8ZahlungMieterhoehung({ 
  vertrag, 
  updateVertrag,
  addStaffel,
  removeStaffel,
  updateStaffel,
  onNext, 
  onPrev 
}: Props) {
  const { bankverbindung, mieterhoehung } = vertrag;

  const handleBankChange = (field: string, value: string) => {
    updateVertrag('bankverbindung', { [field]: value });
  };

  const handleMieterhoehungTypChange = (typ: MieterhoehungTyp) => {
    updateVertrag('mieterhoehung', { typ });
  };

  return (
    <>
      {/* Bankverbindung */}
      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>§8 Fälligkeit - Bankverbindung</h2>
        </div>
        <div className="card-content">
          <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Die Miete ist spätestens bis zum 3. Werktag eines jeden Kalendermonats 
            auf folgendes Konto zu überweisen:
          </p>
          
          <div className="form-group">
            <label>IBAN *</label>
            <input
              type="text"
              value={bankverbindung.iban}
              onChange={(e) => handleBankChange('iban', e.target.value.toUpperCase().replace(/\s/g, ''))}
              placeholder="DE89 3704 0044 0532 0130 00"
              style={{ fontFamily: 'monospace', letterSpacing: '1px' }}
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>BIC</label>
              <input
                type="text"
                value={bankverbindung.bic}
                onChange={(e) => handleBankChange('bic', e.target.value.toUpperCase())}
                placeholder="COBADEFFXXX"
                style={{ fontFamily: 'monospace' }}
              />
            </div>
            <div className="form-group">
              <label>Kontoinhaber *</label>
              <input
                type="text"
                value={bankverbindung.kontoinhaber}
                onChange={(e) => handleBankChange('kontoinhaber', e.target.value)}
                placeholder="Max Mustermann"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mieterhöhung */}
      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>Mieterhöhung (§6/§7)</h2>
        </div>
        <div className="card-content">
          <div className="form-group">
            <label>Art der Mieterhöhung</label>
            <div className="radio-group" style={{ flexDirection: 'column' }}>
              <label className={`radio-item ${mieterhoehung.typ === 'keine' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="mieterhoehung"
                  checked={mieterhoehung.typ === 'keine'}
                  onChange={() => handleMieterhoehungTypChange('keine')}
                />
                <span>Keine Vereinbarung (gesetzliche Regelung)</span>
              </label>
              <label className={`radio-item ${mieterhoehung.typ === 'staffel' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="mieterhoehung"
                  checked={mieterhoehung.typ === 'staffel'}
                  onChange={() => handleMieterhoehungTypChange('staffel')}
                />
                <span>§6 Staffelmiete (feste Erhöhungen zu bestimmten Terminen)</span>
              </label>
              <label className={`radio-item ${mieterhoehung.typ === 'index' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="mieterhoehung"
                  checked={mieterhoehung.typ === 'index'}
                  onChange={() => handleMieterhoehungTypChange('index')}
                />
                <span>§7 Indexmiete (gekoppelt an Verbraucherpreisindex)</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Staffelmiete Details */}
      {mieterhoehung.typ === 'staffel' && (
        <div className="card">
          <div className="card-header">
            <div className="accent-bar" />
            <h2>§6 Staffelmiete</h2>
          </div>
          <div className="card-content">
            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Die Miete muss jeweils mindestens 12 Monate unverändert bleiben.
              Während der Laufzeit einer Staffelmiete ist eine Erhöhung nach §§558-559b BGB ausgeschlossen.
            </p>
            
            {mieterhoehung.staffeln.map((staffel, index) => (
              <div key={index} className="form-row" style={{ marginBottom: '12px', alignItems: 'flex-end' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>{index + 1}. Erhöhung am</label>
                  <input
                    type="date"
                    value={staffel.datum}
                    onChange={(e) => updateStaffel(index, { datum: e.target.value })}
                  />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>um</label>
                  <div className="input-with-suffix">
                    <input
                      type="number"
                      value={staffel.betrag || ''}
                      onChange={(e) => updateStaffel(index, { betrag: parseFloat(e.target.value) || 0 })}
                      placeholder="50"
                      min="0"
                      step="0.01"
                    />
                    <span className="suffix">€</span>
                  </div>
                </div>
                <button
                  onClick={() => removeStaffel(index)}
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
                    marginBottom: '16px',
                  }}
                >
                  <MdDelete size={20} />
                </button>
              </div>
            ))}
            
            {mieterhoehung.staffeln.length < 9 && (
              <button className="add-mieter-btn" onClick={addStaffel}>
                <MdAdd size={24} />
                Staffel hinzufügen ({mieterhoehung.staffeln.length}/9)
              </button>
            )}
          </div>
        </div>
      )}

      {/* Indexmiete Details */}
      {mieterhoehung.typ === 'index' && (
        <div className="card">
          <div className="card-header">
            <div className="accent-bar" />
            <h2>§7 Indexmiete</h2>
          </div>
          <div className="card-content">
            <div style={{ 
              padding: '16px', 
              background: 'var(--accent-light)', 
              borderRadius: '12px',
              marginBottom: '20px',
            }}>
              <MdWarning style={{ color: 'var(--accent)', marginRight: '8px' }} />
              <span style={{ color: 'var(--text-secondary)' }}>
                Staffelmiete und Indexmiete schließen sich gegenseitig aus!
              </span>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Indexmiete vereinbart ab</label>
                <input
                  type="month"
                  value={mieterhoehung.indexStart || ''}
                  onChange={(e) => updateVertrag('mieterhoehung', { indexStart: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Schwelle für Anpassung</label>
                <div className="input-with-suffix">
                  <input
                    type="number"
                    value={mieterhoehung.indexSchwelle}
                    onChange={(e) => updateVertrag('mieterhoehung', { indexSchwelle: parseInt(e.target.value) || 3 })}
                    min="1"
                    max="10"
                  />
                  <span className="suffix">%</span>
                </div>
              </div>
            </div>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '16px' }}>
              Ändert sich der Verbraucherpreisindex um mehr als {mieterhoehung.indexSchwelle}% gegenüber 
              dem Stand bei Vereinbarung oder der letzten Anpassung, kann die Miete entsprechend angepasst werden.
            </p>
          </div>
        </div>
      )}

      <div className="nav-buttons">
        <button className="btn btn-secondary btn-back" onClick={onPrev}>
          <MdChevronLeft size={20} />
          Zurück
        </button>
        <button className="btn btn-primary btn-next" onClick={onNext}>
          Weiter zu Optionen
          <MdChevronRight size={20} />
        </button>
      </div>
    </>
  );
}
