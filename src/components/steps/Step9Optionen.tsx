import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import type { Mietvertrag } from '../../types';

interface Props {
  vertrag: Mietvertrag;
  updateVertrag: (section: keyof Mietvertrag, data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Step9Optionen({ vertrag, updateVertrag, onNext, onPrev }: Props) {
  const { heizung, kleinreparaturen, schoenheitsreparaturen, sonstigeVereinbarungen } = vertrag;

  const heizungsarten = [
    'Zentralheizung (Gas)',
    'Zentralheizung (Öl)',
    'Fernwärme',
    'Wärmepumpe',
    'Gasetagenheizung',
    'Einzelöfen',
    'Nachtspeicherheizung',
  ];

  return (
    <>
      {/* Heizung */}
      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>§9 Heizung</h2>
        </div>
        <div className="card-content">
          <div className="form-group">
            <label>Art der Heizung</label>
            <select
              value={heizung.art}
              onChange={(e) => updateVertrag('heizung', { art: e.target.value })}
            >
              <option value="">Bitte wählen</option>
              {heizungsarten.map(art => (
                <option key={art} value={art}>{art}</option>
              ))}
            </select>
          </div>
          
          <p style={{ color: 'var(--text-secondary)', marginTop: '16px', marginBottom: '12px' }}>
            Heizperiode und -zeiten (Standard nach Vertrag):
          </p>
          
          <div className="form-row">
            <div className="form-group">
              <label>Heizperiode von</label>
              <input
                type="text"
                value={heizung.heizperiodeVon}
                onChange={(e) => updateVertrag('heizung', { heizperiodeVon: e.target.value })}
                placeholder="01.10."
              />
            </div>
            <div className="form-group">
              <label>bis</label>
              <input
                type="text"
                value={heizung.heizperiodeBis}
                onChange={(e) => updateVertrag('heizung', { heizperiodeBis: e.target.value })}
                placeholder="30.04."
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Heizzeit von</label>
              <input
                type="time"
                value={heizung.heizzeitVon}
                onChange={(e) => updateVertrag('heizung', { heizzeitVon: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>bis</label>
              <input
                type="time"
                value={heizung.heizzeitBis}
                onChange={(e) => updateVertrag('heizung', { heizzeitBis: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Kleinreparaturen */}
      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>§14 Kleinreparaturen</h2>
        </div>
        <div className="card-content">
          <label className={`checkbox-item ${kleinreparaturen.aktiv ? 'checked' : ''}`} style={{ marginBottom: '16px' }}>
            <input
              type="checkbox"
              checked={kleinreparaturen.aktiv}
              onChange={(e) => updateVertrag('kleinreparaturen', { aktiv: e.target.checked })}
            />
            <span>🔧 Kleinreparaturklausel aktivieren</span>
          </label>
          
          {kleinreparaturen.aktiv && (
            <>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
                Der Mieter trägt die Kosten für kleine Instandsetzungen an Gegenständen, 
                die seinem häufigen Zugriff unterliegen (z.B. Türgriffe, Wasserhähne, Lichtschalter):
              </p>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Max. pro Einzelfall</label>
                  <div className="input-with-suffix">
                    <input
                      type="number"
                      value={kleinreparaturen.maxEinzel}
                      onChange={(e) => updateVertrag('kleinreparaturen', { maxEinzel: parseInt(e.target.value) || 0 })}
                      min="0"
                      max="150"
                    />
                    <span className="suffix">€</span>
                  </div>
                </div>
                <div className="form-group">
                  <label>Max. pro Kalenderjahr</label>
                  <div className="input-with-suffix">
                    <input
                      type="number"
                      value={kleinreparaturen.maxJahr}
                      onChange={(e) => updateVertrag('kleinreparaturen', { maxJahr: parseInt(e.target.value) || 0 })}
                      min="0"
                      max="600"
                    />
                    <span className="suffix">€</span>
                  </div>
                </div>
              </div>
              
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '8px' }}>
                Empfehlung: Max. 100€ Einzelfall, max. 450€/Jahr (BGH-Rechtsprechung)
              </p>
            </>
          )}
        </div>
      </div>

      {/* Schönheitsreparaturen */}
      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>§15 Schönheitsreparaturen</h2>
        </div>
        <div className="card-content">
          <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Zu den Schönheitsreparaturen gehören: Tapezieren, Streichen der Wände/Decken, 
            Heizkörper, Türen, Fenster von innen.
          </p>
          
          <div className="form-group">
            <label>Zustand bei Übergabe</label>
            <div className="radio-group" style={{ flexDirection: 'column' }}>
              <label className={`radio-item ${schoenheitsreparaturen.uebergabeRenoviert ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="uebergabe"
                  checked={schoenheitsreparaturen.uebergabeRenoviert}
                  onChange={() => updateVertrag('schoenheitsreparaturen', { uebergabeRenoviert: true })}
                />
                <span>✨ Renoviert / nicht renovierungsbedürftig übergeben</span>
              </label>
              <label className={`radio-item ${!schoenheitsreparaturen.uebergabeRenoviert ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="uebergabe"
                  checked={!schoenheitsreparaturen.uebergabeRenoviert}
                  onChange={() => updateVertrag('schoenheitsreparaturen', { uebergabeRenoviert: false })}
                />
                <span>🏚️ Unrenoviert übergeben</span>
              </label>
            </div>
          </div>
          
          {schoenheitsreparaturen.uebergabeRenoviert && (
            <label className={`checkbox-item ${schoenheitsreparaturen.mieterPflicht ? 'checked' : ''}`} style={{ marginTop: '16px' }}>
              <input
                type="checkbox"
                checked={schoenheitsreparaturen.mieterPflicht}
                onChange={(e) => updateVertrag('schoenheitsreparaturen', { mieterPflicht: e.target.checked })}
              />
              <span>🎨 Mieter übernimmt laufende Schönheitsreparaturen während der Mietzeit</span>
            </label>
          )}
          
          {!schoenheitsreparaturen.uebergabeRenoviert && (
            <div style={{ 
              marginTop: '16px', 
              padding: '12px', 
              background: 'var(--warning)', 
              borderRadius: '12px',
              color: 'white',
              fontSize: '0.9rem',
            }}>
              ⚠️ <strong>Achtung:</strong> Bei unrenovierter Übergabe kann die Übertragung der 
              Schönheitsreparaturen auf den Mieter unwirksam sein (BGH VIII ZR 185/14).
            </div>
          )}
        </div>
      </div>

      {/* Sonstige Vereinbarungen */}
      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>§21 Sonstige Vereinbarungen</h2>
        </div>
        <div className="card-content">
          <div className="form-group">
            <label>Individuelle Vereinbarungen (optional)</label>
            <textarea
              value={sonstigeVereinbarungen.text}
              onChange={(e) => updateVertrag('sonstigeVereinbarungen', { text: e.target.value })}
              placeholder="Hier können Sie zusätzliche Vereinbarungen eintragen, z.B. zu Tierhaltung, Gartennutzung, Renovierungsvereinbarungen..."
              style={{ minHeight: '150px' }}
            />
          </div>
        </div>
      </div>

      <div className="nav-buttons">
        <button className="btn btn-secondary btn-back" onClick={onPrev}>
          <MdChevronLeft size={20} />
          Zurück
        </button>
        <button className="btn btn-primary btn-next" onClick={onNext}>
          Weiter zu Abschluss
          <MdChevronRight size={20} />
        </button>
      </div>
    </>
  );
}
