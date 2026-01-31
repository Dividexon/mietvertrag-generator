import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import type { Mietvertrag } from '../../types';

interface Props {
  vertrag: Mietvertrag;
  updateVertrag: (section: keyof Mietvertrag, data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Step4Raeume({ vertrag, updateVertrag, onNext, onPrev }: Props) {
  const { mietobjekt } = vertrag;
  const { raeume, ausstattung } = mietobjekt;

  const toggleRaum = (field: keyof typeof raeume) => {
    updateVertrag('mietobjekt', {
      raeume: {
        ...raeume,
        [field]: !raeume[field],
      },
    });
  };

  const setRaumAnzahl = (field: keyof typeof raeume, value: number) => {
    updateVertrag('mietobjekt', {
      raeume: {
        ...raeume,
        [field]: value,
      },
    });
  };

  const toggleAusstattung = (field: keyof typeof ausstattung) => {
    updateVertrag('mietobjekt', {
      ausstattung: {
        ...ausstattung,
        [field]: !ausstattung[field],
      },
    });
  };

  const raumOptionen = [
    { key: 'wohnzimmer', label: 'Wohnzimmer', icon: '🛋️' },
    { key: 'kueche', label: 'Küche', icon: '🍳' },
    { key: 'bad', label: 'Bad', icon: '🛁' },
    { key: 'gaestewc', label: 'Gäste-WC', icon: '🚽' },
    { key: 'flur', label: 'Flur', icon: '🚪' },
    { key: 'abstellraum', label: 'Abstellraum', icon: '📦' },
    { key: 'balkon', label: 'Balkon', icon: '🌅' },
    { key: 'terrasse', label: 'Terrasse', icon: '☀️' },
    { key: 'garten', label: 'Garten', icon: '🌳' },
    { key: 'keller', label: 'Keller', icon: '🏚️' },
    { key: 'dachboden', label: 'Dachboden', icon: '🏠' },
    { key: 'garage', label: 'Garage', icon: '🚗' },
    { key: 'stellplatz', label: 'Stellplatz', icon: '🅿️' },
  ] as const;

  const ausstattungOptionen = [
    { key: 'einbaukueche', label: 'Einbauküche', icon: '🍽️' },
    { key: 'moebiliert', label: 'Möbliert', icon: '🪑' },
    { key: 'badewanne', label: 'Badewanne', icon: '🛁' },
    { key: 'dusche', label: 'Dusche', icon: '🚿' },
    { key: 'aufzug', label: 'Aufzug', icon: '🛗' },
    { key: 'waschmaschinenanschluss', label: 'Waschmaschinenanschluss', icon: '🧺' },
  ] as const;

  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>Räume</h2>
        </div>
        <div className="card-content">
          <div className="form-row">
            <div className="form-group">
              <label>Anzahl Schlafzimmer</label>
              <select
                value={raeume.schlafzimmer}
                onChange={(e) => setRaumAnzahl('schlafzimmer', parseInt(e.target.value))}
              >
                {[0, 1, 2, 3, 4, 5].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Anzahl Kinderzimmer</label>
              <select
                value={raeume.kinderzimmer}
                onChange={(e) => setRaumAnzahl('kinderzimmer', parseInt(e.target.value))}
              >
                {[0, 1, 2, 3, 4, 5].map(n => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group" style={{ marginTop: '16px' }}>
            <label>Weitere Räume</label>
            <div className="checkbox-grid">
              {raumOptionen.map((option) => (
                <label 
                  key={option.key}
                  className={`checkbox-item ${raeume[option.key] ? 'checked' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={!!raeume[option.key]}
                    onChange={() => toggleRaum(option.key)}
                  />
                  <span>{option.icon} {option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>Ausstattung</h2>
        </div>
        <div className="card-content">
          <div className="checkbox-grid">
            {ausstattungOptionen.map((option) => (
              <label 
                key={option.key}
                className={`checkbox-item ${ausstattung[option.key] ? 'checked' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={ausstattung[option.key]}
                  onChange={() => toggleAusstattung(option.key)}
                />
                <span>{option.icon} {option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="nav-buttons">
        <button className="btn btn-secondary btn-back" onClick={onPrev}>
          <MdChevronLeft size={20} />
          Zurück
        </button>
        <button className="btn btn-primary btn-next" onClick={onNext}>
          Weiter zu Mietkonditionen
          <MdChevronRight size={20} />
        </button>
      </div>
    </>
  );
}
