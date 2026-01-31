import { MdChevronLeft, MdChevronRight, MdAdd, MdDelete } from 'react-icons/md';
import type { Mietvertrag, Mieter } from '../../types';

interface Props {
  vertrag: Mietvertrag;
  addMieter: () => void;
  removeMieter: (id: string) => void;
  updateMieter: (id: string, data: Partial<Mieter>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Step3Mieter({ vertrag, addMieter, removeMieter, updateMieter, onNext, onPrev }: Props) {
  const { mieter } = vertrag;
  const canAddMore = mieter.length < 3;

  return (
    <>
      <div className="card" style={{ marginBottom: '16px' }}>
        <div className="card-header">
          <div className="accent-bar" />
          <h2>Mietpartei</h2>
        </div>
        <div className="card-content">
          <p style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>
            Ein Mietvertrag kann bis zu <strong>3 Personen</strong> als Mieter (Gesamtschuldner) enthalten.
            Bei mehreren Mietern gilt automatisch §19 (Personenmehrheit als Mieter).
          </p>
        </div>
      </div>

      {mieter.map((m, index) => (
        <div key={m.id} className="card">
          <div className="card-header">
            <div className="accent-bar" />
            <h2>Mieter {index + 1}</h2>
            {mieter.length > 1 && (
              <button 
                className="collapse-btn"
                onClick={() => removeMieter(m.id)}
                title="Mieter entfernen"
                style={{ background: 'var(--error)', color: 'white' }}
              >
                <MdDelete />
              </button>
            )}
          </div>
          <div className="card-content">
            <div className="form-row">
              <div className="form-group">
                <label>Vorname *</label>
                <input
                  type="text"
                  value={m.vorname}
                  onChange={(e) => updateMieter(m.id, { vorname: e.target.value })}
                  placeholder="Max"
                />
              </div>
              <div className="form-group">
                <label>Nachname *</label>
                <input
                  type="text"
                  value={m.nachname}
                  onChange={(e) => updateMieter(m.id, { nachname: e.target.value })}
                  placeholder="Mustermann"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Geburtsdatum *</label>
              <input
                type="date"
                value={m.geburtsdatum}
                onChange={(e) => updateMieter(m.id, { geburtsdatum: e.target.value })}
                max="9999-12-31"
              />
            </div>
            
            <div className="form-group">
              <label>Aktuelle Anschrift - Straße und Hausnummer *</label>
              <input
                type="text"
                value={m.strasse}
                onChange={(e) => updateMieter(m.id, { strasse: e.target.value })}
                placeholder="Musterstraße 42"
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>PLZ *</label>
                <input
                  type="text"
                  value={m.plz}
                  onChange={(e) => updateMieter(m.id, { plz: e.target.value })}
                  placeholder="28195"
                  maxLength={5}
                />
              </div>
              <div className="form-group">
                <label>Ort *</label>
                <input
                  type="text"
                  value={m.ort}
                  onChange={(e) => updateMieter(m.id, { ort: e.target.value })}
                  placeholder="Bremen"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Telefon</label>
                <input
                  type="tel"
                  value={m.telefon || ''}
                  onChange={(e) => updateMieter(m.id, { telefon: e.target.value })}
                  placeholder="+49 123 456789"
                />
              </div>
              <div className="form-group">
                <label>E-Mail</label>
                <input
                  type="email"
                  value={m.email || ''}
                  onChange={(e) => updateMieter(m.id, { email: e.target.value })}
                  placeholder="email@example.de"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      {canAddMore && (
        <button className="add-mieter-btn" onClick={addMieter}>
          <MdAdd size={24} />
          Weiteren Mieter hinzufügen ({mieter.length}/3)
        </button>
      )}

      <div className="nav-buttons">
        <button className="btn btn-secondary btn-back" onClick={onPrev}>
          <MdChevronLeft size={20} />
          Zurück
        </button>
        <button className="btn btn-primary btn-next" onClick={onNext}>
          Weiter zu Mietobjekt
          <MdChevronRight size={20} />
        </button>
      </div>
    </>
  );
}
