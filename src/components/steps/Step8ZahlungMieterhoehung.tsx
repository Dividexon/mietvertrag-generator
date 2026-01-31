import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import type { Mietvertrag } from '../../types';

interface Props {
  vertrag: Mietvertrag;
  updateVertrag: (section: keyof Mietvertrag, data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Step8ZahlungMieterhoehung({ 
  vertrag, 
  updateVertrag,
  onNext, 
  onPrev 
}: Props) {
  const { bankverbindung } = vertrag;

  const handleBankChange = (field: string, value: string) => {
    updateVertrag('bankverbindung', { [field]: value });
  };

  return (
    <>
      {/* Bankverbindung */}
      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>§7 Fälligkeit - Bankverbindung</h2>
        </div>
        <div className="card-content">
          <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Die Miete ist spätestens bis zum 3. Werktag eines jeden Kalendermonats 
            auf folgendes Konto zu überweisen:
          </p>
          
          <div className="form-group">
            <label>IBAN *</label>
            <input
              type="text"
              value={bankverbindung.iban}
              onChange={(e) => handleBankChange('iban', e.target.value.toUpperCase().replace(/\s/g, ''))}
              placeholder="DE89 3704 0044 0532 0130 00"
              style={{ fontFamily: 'monospace', letterSpacing: '1px' }}
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>BIC</label>
              <input
                type="text"
                value={bankverbindung.bic}
                onChange={(e) => handleBankChange('bic', e.target.value.toUpperCase())}
                placeholder="COBADEFFXXX"
                style={{ fontFamily: 'monospace' }}
              />
            </div>
            <div className="form-group">
              <label>Kontoinhaber *</label>
              <input
                type="text"
                value={bankverbindung.kontoinhaber}
                onChange={(e) => handleBankChange('kontoinhaber', e.target.value)}
                placeholder="Max Mustermann"
              />
            </div>
          </div>
          
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '16px' }}>
            Bei Zahlungsverzug ist der Vermieter berechtigt, Verzugszinsen und Mahnkosten zu erheben.
          </p>
        </div>
      </div>

      <div className="nav-buttons">
        <button className="btn btn-secondary btn-back" onClick={onPrev}>
          <MdChevronLeft size={20} />
          Zurück
        </button>
        <button className="btn btn-primary btn-next" onClick={onNext}>
          Weiter zu Optionen
          <MdChevronRight size={20} />
        </button>
      </div>
    </>
  );
}
