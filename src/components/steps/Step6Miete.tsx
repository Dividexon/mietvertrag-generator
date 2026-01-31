import { useEffect } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import type { Mietvertrag } from '../../types';

interface Props {
  vertrag: Mietvertrag;
  updateVertrag: (section: keyof Mietvertrag, data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Step6Miete({ vertrag, updateVertrag, onNext, onPrev }: Props) {
  const { miete, mietobjekt } = vertrag;
  const hatGarage = mietobjekt.hatGarage || mietobjekt.hatCarport || mietobjekt.hatStellplatz;

  const handleChange = (field: string, value: number) => {
    updateVertrag('miete', { [field]: value });
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
      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>§5 Miete - Grundmiete</h2>
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
