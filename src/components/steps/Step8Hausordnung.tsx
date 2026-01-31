import { useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import type { Mietvertrag } from '../../types';

interface Props {
  vertrag: Mietvertrag;
  updateVertrag: (section: keyof Mietvertrag, data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

// Standard Hausordnungsregeln
const STANDARD_REGELN = [
  { id: 'ruhezeiten', label: 'Ruhezeiten', text: 'Ruhezeiten sind von 22:00 bis 6:00 Uhr sowie an Sonn- und Feiertagen einzuhalten.' },
  { id: 'treppenreinigung', label: 'Treppenreinigung', text: 'Die Reinigung des Treppenhauses erfolgt im wöchentlichen Wechsel durch die Mieter.' },
  { id: 'winterdienst', label: 'Winterdienst', text: 'Der Winterdienst (Schnee räumen, streuen) ist von den Mietern im Wechsel durchzuführen.' },
  { id: 'muell', label: 'Müllentsorgung', text: 'Müll ist getrennt und nur in den dafür vorgesehenen Behältern zu entsorgen.' },
  { id: 'lueften', label: 'Lüften & Heizen', text: 'Die Wohnung ist regelmäßig zu lüften und ausreichend zu beheizen (mind. 16°C).' },
  { id: 'abstellen', label: 'Gemeinschaftsflächen', text: 'Das Abstellen von Gegenständen in Treppenhäusern und Fluren ist nicht gestattet.' },
  { id: 'grillen', label: 'Grillen', text: 'Grillen auf dem Balkon mit offenem Feuer ist nicht gestattet. Elektrogrills sind erlaubt.' },
  { id: 'waeschepflege', label: 'Wäschepflege', text: 'Wäsche darf nicht an der Fassade oder über öffentlichen Wegen getrocknet werden.' },
];

export function Step8Hausordnung({ vertrag, onNext, onPrev }: Props) {
  const [selectedRegeln, setSelectedRegeln] = useState<string[]>(
    STANDARD_REGELN.map(r => r.id) // Default: alle ausgewählt
  );
  const [customRegeln, setCustomRegeln] = useState('');

  const toggleRegel = (id: string) => {
    setSelectedRegeln(prev => 
      prev.includes(id) 
        ? prev.filter(r => r !== id)
        : [...prev, id]
    );
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>Hausordnung</h2>
        </div>
        <div className="card-content">
          <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Die Hausordnung wird als Anlage dem Mietvertrag beigefügt. 
            Wählen Sie die relevanten Regeln aus oder passen Sie diese an.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {STANDARD_REGELN.map((regel) => (
              <label 
                key={regel.id}
                className={`checkbox-item ${selectedRegeln.includes(regel.id) ? 'checked' : ''}`}
                style={{ padding: '16px', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%' }}>
                  <input
                    type="checkbox"
                    checked={selectedRegeln.includes(regel.id)}
                    onChange={() => toggleRegel(regel.id)}
                  />
                  <span style={{ fontWeight: 600 }}>{regel.label}</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginLeft: '34px' }}>
                  {regel.text}
                </p>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>Zusätzliche Regeln</h2>
        </div>
        <div className="card-content">
          <div className="form-group">
            <label>Eigene Hausordnungsregeln (optional)</label>
            <textarea
              value={customRegeln}
              onChange={(e) => setCustomRegeln(e.target.value)}
              placeholder="Fügen Sie hier weitere Regeln hinzu, die für Ihr Objekt gelten sollen..."
              style={{ minHeight: '120px' }}
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
          Weiter zu Übergabe
          <MdChevronRight size={20} />
        </button>
      </div>
    </>
  );
}
