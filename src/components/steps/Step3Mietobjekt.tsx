import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import type { Mietvertrag } from '../../types';

interface Props {
  vertrag: Mietvertrag;
  updateVertrag: (section: keyof Mietvertrag, data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Step3Mietobjekt({ vertrag, updateVertrag, onNext, onPrev }: Props) {
  const { mietobjekt } = vertrag;

  const handleChange = (field: string, value: string | number) => {
    updateVertrag('mietobjekt', { [field]: value });
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>Art des Mietobjekts</h2>
        </div>
        <div className="card-content">
          <div className="form-group">
            <label>Objektart</label>
            <div className="radio-group">
              {[
                { value: 'wohnung', label: '🏠 Wohnung' },
                { value: 'haus', label: '🏡 Haus' },
                { value: 'zimmer', label: '🚪 Zimmer' },
                { value: 'gewerbe', label: '🏢 Gewerbe' },
              ].map((option) => (
                <label 
                  key={option.value} 
                  className={`radio-item ${mietobjekt.art === option.value ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="objektart"
                    checked={mietobjekt.art === option.value}
                    onChange={() => handleChange('art', option.value)}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>Adresse</h2>
        </div>
        <div className="card-content">
          <div className="form-row-3">
            <div className="form-group">
              <label>Straße</label>
              <input
                type="text"
                value={mietobjekt.strasse}
                onChange={(e) => handleChange('strasse', e.target.value)}
                placeholder="Musterstraße"
              />
            </div>
            <div className="form-group">
              <label>Hausnummer</label>
              <input
                type="text"
                value={mietobjekt.hausnummer}
                onChange={(e) => handleChange('hausnummer', e.target.value)}
                placeholder="42"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>PLZ</label>
              <input
                type="text"
                value={mietobjekt.plz}
                onChange={(e) => handleChange('plz', e.target.value)}
                placeholder="28195"
              />
            </div>
            <div className="form-group">
              <label>Ort</label>
              <input
                type="text"
                value={mietobjekt.ort}
                onChange={(e) => handleChange('ort', e.target.value)}
                placeholder="Bremen"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Etage</label>
              <select
                value={mietobjekt.etage}
                onChange={(e) => handleChange('etage', e.target.value)}
              >
                <option value="">Bitte wählen</option>
                <option value="EG">Erdgeschoss</option>
                <option value="1">1. Etage</option>
                <option value="2">2. Etage</option>
                <option value="3">3. Etage</option>
                <option value="4">4. Etage</option>
                <option value="5">5. Etage</option>
                <option value="DG">Dachgeschoss</option>
              </select>
            </div>
            <div className="form-group">
              <label>Lage</label>
              <select
                value={mietobjekt.lage}
                onChange={(e) => handleChange('lage', e.target.value)}
              >
                <option value="">Bitte wählen</option>
                <option value="links">Links</option>
                <option value="rechts">Rechts</option>
                <option value="mitte">Mitte</option>
                <option value="vorne">Vorne</option>
                <option value="hinten">Hinten</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>Größe</h2>
        </div>
        <div className="card-content">
          <div className="form-row">
            <div className="form-group">
              <label>Wohnfläche</label>
              <div className="input-with-suffix">
                <input
                  type="number"
                  value={mietobjekt.wohnflaeche || ''}
                  onChange={(e) => handleChange('wohnflaeche', parseFloat(e.target.value) || 0)}
                  placeholder="75"
                  min="0"
                  step="0.5"
                />
                <span className="suffix">m²</span>
              </div>
            </div>
            <div className="form-group">
              <label>Zimmeranzahl</label>
              <input
                type="number"
                value={mietobjekt.zimmeranzahl || ''}
                onChange={(e) => handleChange('zimmeranzahl', parseFloat(e.target.value) || 0)}
                placeholder="3"
                min="1"
                step="0.5"
              />
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
          Weiter zu Räume
          <MdChevronRight size={20} />
        </button>
      </div>
    </>
  );
}
