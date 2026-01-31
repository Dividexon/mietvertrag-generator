import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import type { Mietvertrag } from '../../types';

interface Props {
  vertrag: Mietvertrag;
  updateVertrag: (section: keyof Mietvertrag, data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Step6Nebenkosten({ vertrag, updateVertrag, onNext, onPrev }: Props) {
  const { nebenkosten } = vertrag;

  const toggleNebenkosten = (field: keyof typeof nebenkosten) => {
    if (field === 'sonstige') return;
    updateVertrag('nebenkosten', {
      [field]: !nebenkosten[field],
    });
  };

  const nebenkostenOptionen = [
    { key: 'heizung', label: 'Heizung', icon: '🔥' },
    { key: 'warmwasser', label: 'Warmwasser', icon: '🚿' },
    { key: 'kaltwasser', label: 'Kaltwasser', icon: '💧' },
    { key: 'abwasser', label: 'Abwasser', icon: '🚰' },
    { key: 'muellabfuhr', label: 'Müllabfuhr', icon: '🗑️' },
    { key: 'strassenreinigung', label: 'Straßenreinigung', icon: '🧹' },
    { key: 'hausreinigung', label: 'Hausreinigung', icon: '🧼' },
    { key: 'gartenpflege', label: 'Gartenpflege', icon: '🌳' },
    { key: 'aufzug', label: 'Aufzug', icon: '🛗' },
    { key: 'hausmeister', label: 'Hausmeister', icon: '🔧' },
    { key: 'kabelanschluss', label: 'Kabelanschluss', icon: '📺' },
    { key: 'schornsteinfeger', label: 'Schornsteinfeger', icon: '🏠' },
    { key: 'versicherungen', label: 'Versicherungen', icon: '🛡️' },
    { key: 'grundsteuer', label: 'Grundsteuer', icon: '🏛️' },
    { key: 'allgemeinstrom', label: 'Allgemeinstrom', icon: '💡' },
  ] as const;

  const selectedCount = nebenkostenOptionen.filter(opt => nebenkosten[opt.key]).length;

  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>Umlagefähige Betriebskosten</h2>
        </div>
        <div className="card-content">
          <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Wählen Sie alle Betriebskosten aus, die auf den Mieter umgelegt werden sollen.
            Aktuell ausgewählt: <strong style={{ color: 'var(--accent)' }}>{selectedCount}</strong>
          </p>
          
          <div className="checkbox-grid">
            {nebenkostenOptionen.map((option) => (
              <label 
                key={option.key}
                className={`checkbox-item ${nebenkosten[option.key] ? 'checked' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={nebenkosten[option.key] as boolean}
                  onChange={() => toggleNebenkosten(option.key)}
                />
                <span>{option.icon} {option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>Sonstige Kosten</h2>
        </div>
        <div className="card-content">
          <div className="form-group">
            <label>Weitere umlagefähige Kosten (optional)</label>
            <textarea
              value={nebenkosten.sonstige}
              onChange={(e) => updateVertrag('nebenkosten', { sonstige: e.target.value })}
              placeholder="z.B. Wartungskosten für Rauchmelder, Kosten für Gemeinschaftsantenne..."
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
          Weiter zu Sondervereinbarungen
          <MdChevronRight size={20} />
        </button>
      </div>
    </>
  );
}
