import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import type { Mietvertrag } from '../../types';

interface Props {
  vertrag: Mietvertrag;
  updateVertrag: (section: keyof Mietvertrag, data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Step2Vermieter({ vertrag, updateVertrag, onNext, onPrev }: Props) {
  const { vermieter } = vertrag;

  const handleChange = (field: string, value: string) => {
    updateVertrag('vermieter', { [field]: value });
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>Vermietertyp</h2>
        </div>
        <div className="card-content">
          <div className="radio-group">
            <label className={`radio-item ${vermieter.typ === 'person' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="vermieterTyp"
                checked={vermieter.typ === 'person'}
                onChange={() => handleChange('typ', 'person')}
              />
              <span>Privatperson</span>
            </label>
            <label className={`radio-item ${vermieter.typ === 'firma' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="vermieterTyp"
                checked={vermieter.typ === 'firma'}
                onChange={() => handleChange('typ', 'firma')}
              />
              <span>Firma / GmbH</span>
            </label>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>{vermieter.typ === 'firma' ? 'Firmendaten' : 'Persönliche Daten'}</h2>
        </div>
        <div className="card-content">
          <div className="form-group">
            <label>{vermieter.typ === 'firma' ? 'Firmenname' : 'Name'}</label>
            <input
              type="text"
              value={vermieter.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder={vermieter.typ === 'firma' ? 'Mustermann Immobilien GmbH' : 'Max Mustermann'}
            />
          </div>
          
          {vermieter.typ === 'firma' && (
            <div className="form-group">
              <label>Vertreten durch</label>
              <input
                type="text"
                value={vermieter.vertreter || ''}
                onChange={(e) => handleChange('vertreter', e.target.value)}
                placeholder="Geschäftsführer Max Mustermann"
              />
            </div>
          )}
          
          <div className="form-group">
            <label>Straße und Hausnummer</label>
            <input
              type="text"
              value={vermieter.strasse}
              onChange={(e) => handleChange('strasse', e.target.value)}
              placeholder="Musterstraße 123"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>PLZ</label>
              <input
                type="text"
                value={vermieter.plz}
                onChange={(e) => handleChange('plz', e.target.value)}
                placeholder="28195"
                maxLength={5}
              />
            </div>
            <div className="form-group">
              <label>Ort</label>
              <input
                type="text"
                value={vermieter.ort}
                onChange={(e) => handleChange('ort', e.target.value)}
                placeholder="Bremen"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>Kontaktdaten (optional)</h2>
        </div>
        <div className="card-content">
          <div className="form-row">
            <div className="form-group">
              <label>Telefon</label>
              <input
                type="tel"
                value={vermieter.telefon || ''}
                onChange={(e) => handleChange('telefon', e.target.value)}
                placeholder="+49 421 123456"
              />
            </div>
            <div className="form-group">
              <label>E-Mail</label>
              <input
                type="email"
                value={vermieter.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="email@example.de"
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
          Weiter zu Mieter
          <MdChevronRight size={20} />
        </button>
      </div>
    </>
  );
}
