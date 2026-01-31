import { useState } from 'react';
import { MdChevronLeft, MdChevronRight, MdAdd, MdDelete } from 'react-icons/md';
import type { Mietvertrag } from '../../types';

interface Schluessel {
  id: string;
  typ: string;
  anzahl: number;
}

interface Props {
  vertrag: Mietvertrag;
  updateVertrag: (section: keyof Mietvertrag, data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Step9Uebergabe({ vertrag, onNext, onPrev }: Props) {
  const [schluessel, setSchluessel] = useState<Schluessel[]>([
    { id: '1', typ: 'Haustürschlüssel', anzahl: 2 },
    { id: '2', typ: 'Wohnungsschlüssel', anzahl: 3 },
    { id: '3', typ: 'Briefkastenschlüssel', anzahl: 2 },
  ]);
  
  const [zaehlerstaende, setZaehlerstaende] = useState({
    strom: '',
    gas: '',
    wasser: '',
    heizung: '',
  });

  const addSchluessel = () => {
    setSchluessel(prev => [...prev, { 
      id: Date.now().toString(), 
      typ: '', 
      anzahl: 1 
    }]);
  };

  const removeSchluessel = (id: string) => {
    setSchluessel(prev => prev.filter(s => s.id !== id));
  };

  const updateSchluessel = (id: string, field: 'typ' | 'anzahl', value: string | number) => {
    setSchluessel(prev => prev.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ));
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>Schlüsselübergabe</h2>
        </div>
        <div className="card-content">
          <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Dokumentieren Sie alle Schlüssel, die bei Übergabe ausgehändigt werden.
          </p>
          
          {schluessel.map((s) => (
            <div key={s.id} className="form-row" style={{ marginBottom: '12px', alignItems: 'flex-end' }}>
              <div className="form-group" style={{ flex: 2 }}>
                <label>Schlüsselart</label>
                <input
                  type="text"
                  value={s.typ}
                  onChange={(e) => updateSchluessel(s.id, 'typ', e.target.value)}
                  placeholder="z.B. Kellerschlüssel"
                />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label>Anzahl</label>
                <input
                  type="number"
                  value={s.anzahl}
                  onChange={(e) => updateSchluessel(s.id, 'anzahl', parseInt(e.target.value) || 0)}
                  min="1"
                />
              </div>
              <button
                onClick={() => removeSchluessel(s.id)}
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

          <button className="add-mieter-btn" onClick={addSchluessel} style={{ marginTop: '8px' }}>
            <MdAdd size={24} />
            Schlüssel hinzufügen
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>Zählerstände bei Übergabe</h2>
        </div>
        <div className="card-content">
          <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Die Zählerstände werden bei der Wohnungsübergabe dokumentiert.
          </p>
          
          <div className="form-row">
            <div className="form-group">
              <label>Strom (kWh)</label>
              <input
                type="text"
                value={zaehlerstaende.strom}
                onChange={(e) => setZaehlerstaende(prev => ({ ...prev, strom: e.target.value }))}
                placeholder="Bei Übergabe eintragen"
              />
            </div>
            <div className="form-group">
              <label>Gas (m³)</label>
              <input
                type="text"
                value={zaehlerstaende.gas}
                onChange={(e) => setZaehlerstaende(prev => ({ ...prev, gas: e.target.value }))}
                placeholder="Bei Übergabe eintragen"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Wasser (m³)</label>
              <input
                type="text"
                value={zaehlerstaende.wasser}
                onChange={(e) => setZaehlerstaende(prev => ({ ...prev, wasser: e.target.value }))}
                placeholder="Bei Übergabe eintragen"
              />
            </div>
            <div className="form-group">
              <label>Heizung</label>
              <input
                type="text"
                value={zaehlerstaende.heizung}
                onChange={(e) => setZaehlerstaende(prev => ({ ...prev, heizung: e.target.value }))}
                placeholder="Bei Übergabe eintragen"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>Übergabeprotokoll</h2>
        </div>
        <div className="card-content">
          <p style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>
            Bei der Wohnungsübergabe wird ein separates Übergabeprotokoll erstellt, 
            das den Zustand der Wohnung und aller Räume dokumentiert.
          </p>
          <p style={{ color: 'var(--accent)', fontWeight: 500 }}>
            💡 Tipp: Nutzen Sie unsere Übergabeprotokoll-App für eine digitale Dokumentation 
            mit Fotos und Unterschriften.
          </p>
        </div>
      </div>

      <div className="nav-buttons">
        <button className="btn btn-secondary btn-back" onClick={onPrev}>
          <MdChevronLeft size={20} />
          Zurück
        </button>
        <button className="btn btn-primary btn-next" onClick={onNext}>
          Weiter zur Zusammenfassung
          <MdChevronRight size={20} />
        </button>
      </div>
    </>
  );
}
