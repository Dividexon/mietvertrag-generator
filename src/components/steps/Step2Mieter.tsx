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

export function Step2Mieter({ vertrag, addMieter, removeMieter, updateMieter, onNext, onPrev }: Props) {
  const { mieter } = vertrag;

  return (
    <>
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
            <div className="form-group">
              <label>Anrede</label>
              <div className="radio-group">
                {(['herr', 'frau', 'divers'] as const).map((anrede) => (
                  <label key={anrede} className={`radio-item ${m.anrede === anrede ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name={`anrede-${m.id}`}
                      checked={m.anrede === anrede}
                      onChange={() => updateMieter(m.id, { anrede })}
                    />
                    <span>{anrede.charAt(0).toUpperCase() + anrede.slice(1)}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Vorname</label>
                <input
                  type="text"
                  value={m.vorname}
                  onChange={(e) => updateMieter(m.id, { vorname: e.target.value })}
                  placeholder="Vorname"
                />
              </div>
              <div className="form-group">
                <label>Nachname</label>
                <input
                  type="text"
                  value={m.nachname}
                  onChange={(e) => updateMieter(m.id, { nachname: e.target.value })}
                  placeholder="Nachname"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Geburtsdatum</label>
                <input
                  type="date"
                  value={m.geburtsdatum}
                  onChange={(e) => updateMieter(m.id, { geburtsdatum: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Geburtsort</label>
                <input
                  type="text"
                  value={m.geburtsort}
                  onChange={(e) => updateMieter(m.id, { geburtsort: e.target.value })}
                  placeholder="Geburtsort"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Aktuelle Anschrift</label>
              <input
                type="text"
                value={m.aktuelleAnschrift}
                onChange={(e) => updateMieter(m.id, { aktuelleAnschrift: e.target.value })}
                placeholder="Straße, Hausnummer, PLZ, Ort"
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Telefon</label>
                <input
                  type="tel"
                  value={m.telefon}
                  onChange={(e) => updateMieter(m.id, { telefon: e.target.value })}
                  placeholder="+49 123 456789"
                />
              </div>
              <div className="form-group">
                <label>E-Mail</label>
                <input
                  type="email"
                  value={m.email}
                  onChange={(e) => updateMieter(m.id, { email: e.target.value })}
                  placeholder="email@example.de"
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <button className="add-mieter-btn" onClick={addMieter}>
        <MdAdd size={24} />
        Weiteren Mieter hinzufügen
      </button>

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
