import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import type { Mietvertrag } from '../../types';

interface Props {
  vertrag: Mietvertrag;
  updateVertrag: (section: keyof Mietvertrag, data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Step7Sondervereinbarungen({ vertrag, updateVertrag, onNext, onPrev }: Props) {
  const { sondervereinbarungen } = vertrag;

  const handleChange = (field: string, value: any) => {
    if (field.startsWith('renovierung.')) {
      const subField = field.replace('renovierung.', '');
      updateVertrag('sondervereinbarungen', {
        renovierung: {
          ...sondervereinbarungen.renovierung,
          [subField]: value,
        },
      });
    } else if (field.startsWith('kleinreparaturen.')) {
      const subField = field.replace('kleinreparaturen.', '');
      updateVertrag('sondervereinbarungen', {
        kleinreparaturen: {
          ...sondervereinbarungen.kleinreparaturen,
          [subField]: value,
        },
      });
    } else {
      updateVertrag('sondervereinbarungen', { [field]: value });
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>Haustiere & Rauchen</h2>
        </div>
        <div className="card-content">
          <div className="form-group">
            <label>Tierhaltung</label>
            <div className="radio-group">
              {[
                { value: 'erlaubt', label: '✅ Erlaubt' },
                { value: 'verboten', label: '❌ Nicht erlaubt' },
                { value: 'genehmigung', label: '📋 Mit Genehmigung' },
              ].map((opt) => (
                <label 
                  key={opt.value}
                  className={`radio-item ${sondervereinbarungen.haustiere === opt.value ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="haustiere"
                    checked={sondervereinbarungen.haustiere === opt.value}
                    onChange={() => handleChange('haustiere', opt.value)}
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
          
          {sondervereinbarungen.haustiere && sondervereinbarungen.haustiere !== 'verboten' && (
            <div className="form-group">
              <label>Details zur Tierhaltung</label>
              <textarea
                value={sondervereinbarungen.haustiereDetails}
                onChange={(e) => handleChange('haustiereDetails', e.target.value)}
                placeholder="z.B. Nur Kleintiere, max. 1 Katze..."
              />
            </div>
          )}

          <div className="form-group" style={{ marginTop: '16px' }}>
            <label>Rauchen</label>
            <div className="radio-group">
              {[
                { value: 'erlaubt', label: '✅ Erlaubt' },
                { value: 'verboten', label: '❌ Nicht erlaubt' },
                { value: 'balkon', label: '🌅 Nur Balkon/Terrasse' },
              ].map((opt) => (
                <label 
                  key={opt.value}
                  className={`radio-item ${sondervereinbarungen.rauchen === opt.value ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="rauchen"
                    checked={sondervereinbarungen.rauchen === opt.value}
                    onChange={() => handleChange('rauchen', opt.value)}
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>Renovierung & Schönheitsreparaturen</h2>
        </div>
        <div className="card-content">
          <div className="checkbox-grid">
            <label className={`checkbox-item ${sondervereinbarungen.renovierung.beiEinzug ? 'checked' : ''}`}>
              <input
                type="checkbox"
                checked={sondervereinbarungen.renovierung.beiEinzug}
                onChange={(e) => handleChange('renovierung.beiEinzug', e.target.checked)}
              />
              <span>🔨 Bei Einzug renoviert übergeben</span>
            </label>
            <label className={`checkbox-item ${sondervereinbarungen.renovierung.beiAuszug ? 'checked' : ''}`}>
              <input
                type="checkbox"
                checked={sondervereinbarungen.renovierung.beiAuszug}
                onChange={(e) => handleChange('renovierung.beiAuszug', e.target.checked)}
              />
              <span>🧹 Bei Auszug renovieren</span>
            </label>
            <label className={`checkbox-item ${sondervereinbarungen.renovierung.waehrendMietzeit ? 'checked' : ''}`}>
              <input
                type="checkbox"
                checked={sondervereinbarungen.renovierung.waehrendMietzeit}
                onChange={(e) => handleChange('renovierung.waehrendMietzeit', e.target.checked)}
              />
              <span>🎨 Laufende Schönheitsreparaturen</span>
            </label>
          </div>
          
          <div className="form-group" style={{ marginTop: '16px' }}>
            <label>Details zu Renovierungspflichten</label>
            <textarea
              value={sondervereinbarungen.renovierung.details}
              onChange={(e) => handleChange('renovierung.details', e.target.value)}
              placeholder="z.B. Wände in hellen, neutralen Farben streichen..."
            />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>Kleinreparaturen</h2>
        </div>
        <div className="card-content">
          <div className="form-group">
            <label className={`checkbox-item ${sondervereinbarungen.kleinreparaturen.enabled ? 'checked' : ''}`} style={{ marginBottom: '16px' }}>
              <input
                type="checkbox"
                checked={sondervereinbarungen.kleinreparaturen.enabled}
                onChange={(e) => handleChange('kleinreparaturen.enabled', e.target.checked)}
              />
              <span>🔧 Kleinreparaturklausel aktivieren</span>
            </label>
          </div>

          {sondervereinbarungen.kleinreparaturen.enabled && (
            <div className="form-row">
              <div className="form-group">
                <label>Max. pro Einzelreparatur</label>
                <div className="input-with-suffix">
                  <input
                    type="number"
                    value={sondervereinbarungen.kleinreparaturen.maxEinzel || ''}
                    onChange={(e) => handleChange('kleinreparaturen.maxEinzel', parseFloat(e.target.value) || 0)}
                    placeholder="100"
                    min="0"
                  />
                  <span className="suffix">€</span>
                </div>
              </div>
              <div className="form-group">
                <label>Max. pro Jahr</label>
                <div className="input-with-suffix">
                  <input
                    type="number"
                    value={sondervereinbarungen.kleinreparaturen.maxJahr || ''}
                    onChange={(e) => handleChange('kleinreparaturen.maxJahr', parseFloat(e.target.value) || 0)}
                    placeholder="300"
                    min="0"
                  />
                  <span className="suffix">€</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>Weitere Vereinbarungen</h2>
        </div>
        <div className="card-content">
          <div className="form-group">
            <label className={`checkbox-item ${sondervereinbarungen.untervermietung ? 'checked' : ''}`}>
              <input
                type="checkbox"
                checked={sondervereinbarungen.untervermietung}
                onChange={(e) => handleChange('untervermietung', e.target.checked)}
              />
              <span>🏠 Untervermietung mit Genehmigung erlaubt</span>
            </label>
          </div>

          <div className="form-group" style={{ marginTop: '16px' }}>
            <label>Sonstige Vereinbarungen</label>
            <textarea
              value={sondervereinbarungen.sonstige}
              onChange={(e) => handleChange('sonstige', e.target.value)}
              placeholder="Weitere individuelle Vereinbarungen..."
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
          Weiter zu Hausordnung
          <MdChevronRight size={20} />
        </button>
      </div>
    </>
  );
}
