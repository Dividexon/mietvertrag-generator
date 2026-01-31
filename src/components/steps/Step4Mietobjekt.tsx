import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import type { Mietvertrag } from '../../types';

interface Props {
  vertrag: Mietvertrag;
  updateVertrag: (section: keyof Mietvertrag, data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Step4Mietobjekt({ vertrag, updateVertrag, onNext, onPrev }: Props) {
  const { mietobjekt } = vertrag;

  const handleChange = (field: string, value: any) => {
    if (field.startsWith('schluessel.')) {
      const schluesselField = field.replace('schluessel.', '');
      updateVertrag('mietobjekt', {
        schluessel: {
          ...mietobjekt.schluessel,
          [schluesselField]: value,
        },
      });
    } else {
      updateVertrag('mietobjekt', { [field]: value });
    }
  };

  const toggleRaum = (field: string) => {
    updateVertrag('mietobjekt', { [field]: !mietobjekt[field as keyof typeof mietobjekt] });
  };

  // Räume nach Haus & Grund Vorlage
  const raeume = [
    { key: 'hatKueche', label: 'Küche' },
    { key: 'hatKochnische', label: 'Kochnische' },
    { key: 'hatBalkon', label: 'Balkon' },
    { key: 'hatTerrasse', label: 'Terrasse' },
    { key: 'hatDiele', label: 'Diele' },
    { key: 'hatBad', label: 'Bad' },
    { key: 'hatDusche', label: 'Dusche' },
    { key: 'hatWcRaum', label: 'WC-Raum' },
    { key: 'hatBoden', label: 'Boden/Speicher' },
    { key: 'hatKeller', label: 'Keller' },
  ];

  const zusaetzlich = [
    { key: 'hatCarport', label: 'Carport' },
    { key: 'hatGarage', label: 'Garage' },
    { key: 'hatStellplatz', label: 'PKW-Stellplatz' },
    { key: 'hatGarten', label: 'Garten' },
  ];

  return (
    <>
      {/* Adresse */}
      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>Adresse des Mietobjekts</h2>
        </div>
        <div className="card-content">
          <div className="form-row">
            <div className="form-group" style={{ flex: 2 }}>
              <label>Straße *</label>
              <input
                type="text"
                value={mietobjekt.strasse}
                onChange={(e) => handleChange('strasse', e.target.value)}
                placeholder="Musterstraße"
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Hausnr. *</label>
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
              <label>PLZ *</label>
              <input
                type="text"
                value={mietobjekt.plz}
                onChange={(e) => handleChange('plz', e.target.value)}
                placeholder="28195"
                maxLength={5}
              />
            </div>
            <div className="form-group">
              <label>Ort *</label>
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
              <label>Geschoss *</label>
              <input
                type="text"
                value={mietobjekt.geschoss}
                onChange={(e) => handleChange('geschoss', e.target.value)}
                placeholder="z.B. EG, 1. OG, Dachgeschoss"
              />
            </div>
            <div className="form-group">
              <label>Lage im Geschoss</label>
              <select
                value={mietobjekt.lage || ''}
                onChange={(e) => handleChange('lage', e.target.value)}
              >
                <option value="">-</option>
                <option value="links">links</option>
                <option value="rechts">rechts</option>
                <option value="mitte">Mitte</option>
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Wohnungsnummer</label>
              <input
                type="text"
                value={mietobjekt.wohnungsnummer || ''}
                onChange={(e) => handleChange('wohnungsnummer', e.target.value)}
                placeholder="z.B. Nr. 5"
              />
            </div>
            <div className="form-group">
              <label>Wohnfläche *</label>
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
          </div>
        </div>
      </div>

      {/* Räume */}
      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>Räume (§1 Mieträume)</h2>
        </div>
        <div className="card-content">
          <div className="form-group">
            <label>Anzahl Zimmer *</label>
            <input
              type="number"
              value={mietobjekt.zimmeranzahl || ''}
              onChange={(e) => handleChange('zimmeranzahl', parseInt(e.target.value) || 0)}
              placeholder="3"
              min="1"
              max="20"
              style={{ maxWidth: '120px' }}
            />
          </div>
          
          <label style={{ marginTop: '16px' }}>Weitere Räume</label>
          <div className="checkbox-grid">
            {raeume.map((raum) => (
              <label 
                key={raum.key}
                className={`checkbox-item ${mietobjekt[raum.key as keyof typeof mietobjekt] ? 'checked' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={!!mietobjekt[raum.key as keyof typeof mietobjekt]}
                  onChange={() => toggleRaum(raum.key)}
                />
                <span>{raum.label}</span>
              </label>
            ))}
          </div>
          
          <div className="form-group" style={{ marginTop: '16px' }}>
            <label>Sonstiges</label>
            <input
              type="text"
              value={mietobjekt.raeumeSonstiges || ''}
              onChange={(e) => handleChange('raeumeSonstiges', e.target.value)}
              placeholder="z.B. Abstellraum, Wintergarten..."
            />
          </div>
        </div>
      </div>

      {/* Zusätzliche Mietobjekte */}
      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>Zusätzlich vermietet</h2>
        </div>
        <div className="card-content">
          <div className="checkbox-grid">
            {zusaetzlich.map((item) => (
              <label 
                key={item.key}
                className={`checkbox-item ${mietobjekt[item.key as keyof typeof mietobjekt] ? 'checked' : ''}`}
              >
                <input
                  type="checkbox"
                  checked={!!mietobjekt[item.key as keyof typeof mietobjekt]}
                  onChange={() => toggleRaum(item.key)}
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
          
          {mietobjekt.hatStellplatz && (
            <div className="form-group" style={{ marginTop: '16px' }}>
              <label>Stellplatz-Nummer</label>
              <input
                type="text"
                value={mietobjekt.stellplatzNummer || ''}
                onChange={(e) => handleChange('stellplatzNummer', e.target.value)}
                placeholder="z.B. Nr. 12"
              />
            </div>
          )}
          
          {mietobjekt.hatGarten && (
            <div className="form-group" style={{ marginTop: '16px' }}>
              <label>Gartenbeschreibung</label>
              <input
                type="text"
                value={mietobjekt.gartenBeschreibung || ''}
                onChange={(e) => handleChange('gartenBeschreibung', e.target.value)}
                placeholder="z.B. Hintergarten zur alleinigen Nutzung, ca. 50m²"
              />
            </div>
          )}
          
          <div className="form-group" style={{ marginTop: '16px' }}>
            <label>Gemeinschaftseinrichtungen</label>
            <input
              type="text"
              value={mietobjekt.gemeinschaftseinrichtungen || ''}
              onChange={(e) => handleChange('gemeinschaftseinrichtungen', e.target.value)}
              placeholder="z.B. Waschküche, Fahrradkeller, Garten..."
            />
          </div>
        </div>
      </div>

      {/* Schlüssel */}
      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>Schlüsselübergabe</h2>
        </div>
        <div className="card-content">
          <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Anzahl der Schlüssel, die dem Mieter ausgehändigt werden:
          </p>
          
          <div className="form-row">
            <div className="form-group">
              <label>Schließanlage</label>
              <input
                type="number"
                value={mietobjekt.schluessel.schliessanlage || ''}
                onChange={(e) => handleChange('schluessel.schliessanlage', parseInt(e.target.value) || 0)}
                min="0"
                max="20"
              />
            </div>
            <div className="form-group">
              <label>Hausschlüssel</label>
              <input
                type="number"
                value={mietobjekt.schluessel.haus || ''}
                onChange={(e) => handleChange('schluessel.haus', parseInt(e.target.value) || 0)}
                min="0"
                max="20"
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Wohnungsschlüssel</label>
              <input
                type="number"
                value={mietobjekt.schluessel.wohnung || ''}
                onChange={(e) => handleChange('schluessel.wohnung', parseInt(e.target.value) || 0)}
                min="0"
                max="20"
              />
            </div>
            <div className="form-group">
              <label>Briefkastenschlüssel</label>
              <input
                type="number"
                value={mietobjekt.schluessel.briefkasten || ''}
                onChange={(e) => handleChange('schluessel.briefkasten', parseInt(e.target.value) || 0)}
                min="0"
                max="20"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Sonstige Schlüssel</label>
            <input
              type="text"
              value={mietobjekt.schluessel.sonstige || ''}
              onChange={(e) => handleChange('schluessel.sonstige', e.target.value)}
              placeholder="z.B. 2x Kellerschlüssel, 1x Garagenschlüssel"
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
          Weiter zu Mietzeit
          <MdChevronRight size={20} />
        </button>
      </div>
    </>
  );
}
