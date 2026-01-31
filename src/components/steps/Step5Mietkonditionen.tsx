import { useEffect } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import type { Mietvertrag } from '../../types';

interface Props {
  vertrag: Mietvertrag;
  updateVertrag: (section: keyof Mietvertrag, data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Step5Mietkonditionen({ vertrag, updateVertrag, onNext, onPrev }: Props) {
  const { mietkonditionen } = vertrag;

  const handleChange = (field: string, value: string | number | boolean) => {
    updateVertrag('mietkonditionen', { [field]: value });
  };

  // Automatisch Gesamtmiete berechnen
  useEffect(() => {
    const gesamt = mietkonditionen.kaltmiete + 
                   mietkonditionen.nebenkostenvorauszahlung + 
                   mietkonditionen.heizkostenvorauszahlung;
    if (gesamt !== mietkonditionen.gesamtmiete) {
      updateVertrag('mietkonditionen', { gesamtmiete: gesamt });
    }
  }, [mietkonditionen.kaltmiete, mietkonditionen.nebenkostenvorauszahlung, mietkonditionen.heizkostenvorauszahlung]);

  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>Mietbeginn & Laufzeit</h2>
        </div>
        <div className="card-content">
          <div className="form-row">
            <div className="form-group">
              <label>Mietbeginn</label>
              <input
                type="date"
                value={mietkonditionen.mietbeginn}
                onChange={(e) => handleChange('mietbeginn', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Vertragslaufzeit</label>
              <div className="radio-group">
                <label className={`radio-item ${!mietkonditionen.befristet ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    checked={!mietkonditionen.befristet}
                    onChange={() => handleChange('befristet', false)}
                  />
                  <span>Unbefristet</span>
                </label>
                <label className={`radio-item ${mietkonditionen.befristet ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    checked={mietkonditionen.befristet}
                    onChange={() => handleChange('befristet', true)}
                  />
                  <span>Befristet</span>
                </label>
              </div>
            </div>
          </div>

          {mietkonditionen.befristet && (
            <>
              <div className="form-group">
                <label>Mietende</label>
                <input
                  type="date"
                  value={mietkonditionen.mietende}
                  onChange={(e) => handleChange('mietende', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Befristungsgrund</label>
                <textarea
                  value={mietkonditionen.befristungsgrund}
                  onChange={(e) => handleChange('befristungsgrund', e.target.value)}
                  placeholder="Grund für die Befristung (z.B. Eigenbedarf, Umbaumaßnahmen)"
                />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>Miete</h2>
        </div>
        <div className="card-content">
          <div className="form-row-equal">
            <div className="form-group">
              <label>Kaltmiete</label>
              <div className="input-with-suffix">
                <input
                  type="number"
                  value={mietkonditionen.kaltmiete || ''}
                  onChange={(e) => handleChange('kaltmiete', parseFloat(e.target.value) || 0)}
                  placeholder="500"
                  min="0"
                  step="0.01"
                />
                <span className="suffix">€</span>
              </div>
            </div>
            <div className="form-group">
              <label>Nebenkosten</label>
              <div className="input-with-suffix">
                <input
                  type="number"
                  value={mietkonditionen.nebenkostenvorauszahlung || ''}
                  onChange={(e) => handleChange('nebenkostenvorauszahlung', parseFloat(e.target.value) || 0)}
                  placeholder="100"
                  min="0"
                  step="0.01"
                />
                <span className="suffix">€</span>
              </div>
            </div>
            <div className="form-group">
              <label>Heizkosten</label>
              <div className="input-with-suffix">
                <input
                  type="number"
                  value={mietkonditionen.heizkostenvorauszahlung || ''}
                  onChange={(e) => handleChange('heizkostenvorauszahlung', parseFloat(e.target.value) || 0)}
                  placeholder="80"
                  min="0"
                  step="0.01"
                />
                <span className="suffix">€</span>
              </div>
            </div>
          </div>

          <div className="form-group" style={{ marginTop: '24px', padding: '16px', background: 'var(--accent-light)', borderRadius: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>Gesamtmiete (Warmmiete)</span>
              <span style={{ fontWeight: 700, fontSize: '1.5rem', color: 'var(--accent)' }}>
                {mietkonditionen.gesamtmiete.toFixed(2)} €
              </span>
            </div>
          </div>

          <div className="form-row" style={{ marginTop: '16px' }}>
            <div className="form-group">
              <label>Zahlungsziel</label>
              <select
                value={mietkonditionen.zahlungsziel}
                onChange={(e) => handleChange('zahlungsziel', parseInt(e.target.value))}
              >
                <option value={1}>1. Werktag des Monats</option>
                <option value={3}>3. Werktag des Monats</option>
                <option value={5}>5. Werktag des Monats</option>
                <option value={15}>15. des Monats</option>
              </select>
            </div>
            <div className="form-group">
              <label>Zahlungsweise</label>
              <select
                value={mietkonditionen.zahlungsweise}
                onChange={(e) => handleChange('zahlungsweise', e.target.value)}
              >
                <option value="ueberweisung">Überweisung</option>
                <option value="lastschrift">Lastschrift</option>
                <option value="bar">Bar</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>Kaution</h2>
        </div>
        <div className="card-content">
          <div className="form-row">
            <div className="form-group">
              <label>Kaution</label>
              <div className="input-with-suffix">
                <input
                  type="number"
                  value={mietkonditionen.kaution || ''}
                  onChange={(e) => handleChange('kaution', parseFloat(e.target.value) || 0)}
                  placeholder="1500"
                  min="0"
                  step="0.01"
                />
                <span className="suffix">€</span>
              </div>
            </div>
            <div className="form-group">
              <label>= {(mietkonditionen.kaution / (mietkonditionen.kaltmiete || 1)).toFixed(1)} Monatskaltmieten</label>
              <div className="radio-group">
                <label className={`radio-item ${!mietkonditionen.kautionInRaten ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    checked={!mietkonditionen.kautionInRaten}
                    onChange={() => handleChange('kautionInRaten', false)}
                  />
                  <span>Einmalzahlung</span>
                </label>
                <label className={`radio-item ${mietkonditionen.kautionInRaten ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    checked={mietkonditionen.kautionInRaten}
                    onChange={() => handleChange('kautionInRaten', true)}
                  />
                  <span>In Raten</span>
                </label>
              </div>
            </div>
          </div>

          {mietkonditionen.kautionInRaten && (
            <div className="form-group">
              <label>Anzahl Raten</label>
              <select
                value={mietkonditionen.kautionRaten}
                onChange={(e) => handleChange('kautionRaten', parseInt(e.target.value))}
              >
                <option value={2}>2 Raten</option>
                <option value={3}>3 Raten</option>
              </select>
            </div>
          )}
        </div>
      </div>

      <div className="nav-buttons">
        <button className="btn btn-secondary btn-back" onClick={onPrev}>
          <MdChevronLeft size={20} />
          Zurück
        </button>
        <button className="btn btn-primary btn-next" onClick={onNext}>
          Weiter zu Nebenkosten
          <MdChevronRight size={20} />
        </button>
      </div>
    </>
  );
}
