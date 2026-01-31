import { MdChevronRight } from 'react-icons/md';
import type { Mietvertrag } from '../../types';

interface Props {
  vertrag: Mietvertrag;
  updateVertrag: (section: keyof Mietvertrag, data: any) => void;
  onNext: () => void;
}

export function Step1Vermieter({ vertrag, updateVertrag, onNext }: Props) {
  const { vermieter } = vertrag;

  const handleChange = (field: string, value: string) => {
    if (field.startsWith('bankverbindung.')) {
      const bankField = field.replace('bankverbindung.', '');
      updateVertrag('vermieter', {
        bankverbindung: {
          ...vermieter.bankverbindung,
          [bankField]: value,
        },
      });
    } else {
      updateVertrag('vermieter', { [field]: value });
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>Persönliche Daten</h2>
        </div>
        <div className="card-content">
          <div className="form-group">
            <label>Name / Firma</label>
            <input
              type="text"
              value={vermieter.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="z.B. Max Mustermann oder Mustermann Immobilien GmbH"
            />
          </div>
          
          <div className="form-group">
            <label>Anschrift</label>
            <input
              type="text"
              value={vermieter.anschrift}
              onChange={(e) => handleChange('anschrift', e.target.value)}
              placeholder="Straße und Hausnummer"
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
          
          <div className="form-row">
            <div className="form-group">
              <label>Telefon</label>
              <input
                type="tel"
                value={vermieter.telefon}
                onChange={(e) => handleChange('telefon', e.target.value)}
                placeholder="+49 421 123456"
              />
            </div>
            <div className="form-group">
              <label>E-Mail</label>
              <input
                type="email"
                value={vermieter.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="email@example.de"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>Bankverbindung</h2>
        </div>
        <div className="card-content">
          <div className="form-group">
            <label>Kontoinhaber</label>
            <input
              type="text"
              value={vermieter.bankverbindung.kontoinhaber}
              onChange={(e) => handleChange('bankverbindung.kontoinhaber', e.target.value)}
              placeholder="Name des Kontoinhabers"
            />
          </div>
          
          <div className="form-group">
            <label>IBAN</label>
            <input
              type="text"
              value={vermieter.bankverbindung.iban}
              onChange={(e) => handleChange('bankverbindung.iban', e.target.value.toUpperCase())}
              placeholder="DE89 3704 0044 0532 0130 00"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>BIC</label>
              <input
                type="text"
                value={vermieter.bankverbindung.bic}
                onChange={(e) => handleChange('bankverbindung.bic', e.target.value.toUpperCase())}
                placeholder="COBADEFFXXX"
              />
            </div>
            <div className="form-group">
              <label>Bank</label>
              <input
                type="text"
                value={vermieter.bankverbindung.bank}
                onChange={(e) => handleChange('bankverbindung.bank', e.target.value)}
                placeholder="Sparkasse Bremen"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="nav-buttons">
        <button className="btn btn-primary btn-next" onClick={onNext}>
          Weiter zu Mieter
          <MdChevronRight size={20} />
        </button>
      </div>
    </>
  );
}
