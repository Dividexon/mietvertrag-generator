import { useEffect } from 'react';
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

export function Step6Miete({ 
  vertrag, 
  updateVertrag, 
  addStaffel,
  removeStaffel,
  updateStaffel,
  onNext, 
  onPrev 
}: Props) {
  const { miete, mietobjekt, mieterhoehung } = vertrag;
  const hatGarage = mietobjekt.hatGarage || mietobjekt.hatCarport || mietobjekt.hatStellplatz;

  const handleChange = (field: string, value: number) => {
    updateVertrag('miete', { [field]: value });
  };

  const handleMieterhoehungTypChange = (typ: MieterhoehungTyp) => {
    updateVertrag('mieterhoehung', { typ });
  };

  // Automatisch Summen berechnen
  useEffect(() => {
    const grundmieteGesamt = 
      miete.grundmieteWohnung + 
      miete.grundmieteGarage + 
      miete.grundmieteSonstiges;
    
    const gesamtmiete = grundmieteGesamt + miete.nebenkostenVorauszahlung;
    
    if (grundmieteGesamt !== miete.grundmieteGesamt || gesamtmiete !== miete.gesamtmiete) {
      updateVertrag('miete', { grundmieteGesamt, gesamtmiete });
    }
  }, [miete.grundmieteWohnung, miete.grundmieteGarage, miete.grundmieteSonstiges, miete.nebenkostenVorauszahlung]);

  return (
    <>
      {/* §4 Grundmiete */}
      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>§4 Miete - Grundmiete</h2>
        </div>
        <div className="card-content">
          <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>
            Die Grundmiete (Kaltmiete) beträgt monatlich:
          </p>
          
          <div className="form-group">
            <label>a) Wohnraum *</label>
            <div className="input-with-suffix">
              <input
                type="number"
                value={miete.grundmieteWohnung || ''}
                onChange={(e) => handleChange('grundmieteWohnung', parseFloat(e.target.value) || 0)}
                placeholder="500"
                min="0"
                step="0.01"
              />
              <span className="suffix">€</span>
            </div>
          </div>
          
          {hatGarage && (
            <div className="form-group">
              <label>b) Carport / Garage / PKW-Stellplatz</label>
              <div className="input-with-suffix">
                <input
                  type="number"
                  value={miete.grundmieteGarage || ''}
                  onChange={(e) => handleChange('grundmieteGarage', parseFloat(e.target.value) || 0)}
                  placeholder="50"
                  min="0"
                  step="0.01"
                />
                <span className="suffix">€</span>
              </div>
            </div>
          )}
          
          <div className="form-group">
            <label>c) Sonstiges</label>
            <div className="form-row">
              <div style={{ flex: 2 }}>
                <input
                  type="text"
                  value={miete.grundmieteSonstigesBeschreibung || ''}
                  onChange={(e) => updateVertrag('miete', { grundmieteSonstigesBeschreibung: e.target.value })}
                  placeholder="Beschreibung (z.B. Garten)"
                />
              </div>
              <div style={{ flex: 1 }}>
                <div className="input-with-suffix">
                  <input
                    type="number"
                    value={miete.grundmieteSonstiges || ''}
                    onChange={(e) => handleChange('grundmieteSonstiges', parseFloat(e.target.value) || 0)}
                    placeholder="0"
                    min="0"
                    step="0.01"
                  />
                  <span className="suffix">€</span>
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ 
            marginTop: '24px', 
            padding: '16px', 
            background: 'var(--bg-input)', 
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 600 }}>Summe Grundmiete</span>
              <span style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--text-primary)' }}>
                {miete.grundmieteGesamt.toFixed(2)} €
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Betriebskosten-Vorauszahlung */}
      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>Betriebskosten-Vorauszahlung</h2>
        </div>
        <div className="card-content">
          <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Monatlich an den Vermieter zu leistende Vorauszahlung für Betriebskosten:
          </p>
          
          <div className="form-group">
            <label>Vorauszahlung Nebenkosten *</label>
            <div className="input-with-suffix">
              <input
                type="number"
                value={miete.nebenkostenVorauszahlung || ''}
                onChange={(e) => handleChange('nebenkostenVorauszahlung', parseFloat(e.target.value) || 0)}
                placeholder="150"
                min="0"
                step="0.01"
              />
              <span className="suffix">€</span>
            </div>
          </div>
          
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '12px' }}>
            Die Betriebskosten werden im nächsten Schritt detailliert aufgeschlüsselt.
          </p>
        </div>
      </div>

      {/* Gesamtmiete */}
      <div className="card" style={{ background: 'var(--accent-pastel)', border: '2px solid var(--accent)' }}>
        <div className="card-header">
          <div className="accent-bar" />
          <h2>Gesamtmiete (Warmmiete)</h2>
        </div>
        <div className="card-content">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Monatlich zu zahlen:</span>
            </div>
            <span style={{ fontWeight: 700, fontSize: '2rem', color: 'var(--accent)' }}>
              {miete.gesamtmiete.toFixed(2)} €
            </span>
          </div>
          
          <div style={{ marginTop: '16px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Grundmiete:</span>
              <span>{miete.grundmieteGesamt.toFixed(2)} €</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>+ Nebenkosten-Vorauszahlung:</span>
              <span>{miete.nebenkostenVorauszahlung.toFixed(2)} €</span>
            </div>
          </div>
        </div>
      </div>

      {/* §5 Mieterhöhung */}
      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>§5 Mieterhöhung</h2>
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
                <span>Staffelmiete (feste Erhöhungen zu bestimmten Terminen)</span>
              </label>
              <label className={`radio-item ${mieterhoehung.typ === 'index' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="mieterhoehung"
                  checked={mieterhoehung.typ === 'index'}
                  onChange={() => handleMieterhoehungTypChange('index')}
                />
                <span>Indexmiete (gekoppelt an Verbraucherpreisindex)</span>
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
            <h2>§5 Staffelmiete</h2>
          </div>
          <div className="card-content">
            <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Die Miete muss jeweils mindestens 12 Monate unverändert bleiben.
              Während der Laufzeit einer Staffelmiete ist eine Erhöhung nach §§558-559b BGB ausgeschlossen.
            </p>
            
            {mieterhoehung.staffeln.map((staffel, index) => (
              <div key={index} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px', 
                marginBottom: '12px',
                padding: '12px 16px',
                background: 'var(--bg-input)',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
              }}>
                <span style={{ fontWeight: 600, color: 'var(--text-secondary)', minWidth: '24px' }}>
                  {index + 1}.
                </span>
                <input
                  type="date"
                  value={staffel.datum}
                  onChange={(e) => updateStaffel(index, { datum: e.target.value })}
                  max="9999-12-31"
                  style={{ flex: 1, maxWidth: '180px' }}
                />
                <span style={{ color: 'var(--text-secondary)' }}>um</span>
                <div className="input-with-suffix" style={{ flex: 1, maxWidth: '140px' }}>
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
                    flexShrink: 0,
                  }}
                  title="Staffel löschen"
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
            <h2>§5 Indexmiete</h2>
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
          Weiter zu Betriebskosten
          <MdChevronRight size={20} />
        </button>
      </div>
    </>
  );
}
