import { MdChevronLeft, MdChevronRight, MdWarning } from 'react-icons/md';
import type { Mietvertrag } from '../../types';

interface Props {
  vertrag: Mietvertrag;
  updateVertrag: (section: keyof Mietvertrag, data: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function Step5Mietzeit({ vertrag, updateVertrag, onNext, onPrev }: Props) {
  const { mietzeit } = vertrag;

  const handleChange = (field: string, value: any) => {
    updateVertrag('mietzeit', { [field]: value });
  };

  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>§2 Mietzeit</h2>
        </div>
        <div className="card-content">
          <div className="form-group">
            <label>Mietbeginn *</label>
            <input
              type="date"
              value={mietzeit.mietbeginn}
              onChange={(e) => handleChange('mietbeginn', e.target.value)}
            />
          </div>
          
          <div className="form-group" style={{ marginTop: '24px' }}>
            <label>Vertragslaufzeit</label>
            <div className="radio-group">
              <label className={`radio-item ${!mietzeit.befristet ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="befristet"
                  checked={!mietzeit.befristet}
                  onChange={() => handleChange('befristet', false)}
                />
                <span>Unbefristet</span>
              </label>
              <label className={`radio-item ${mietzeit.befristet ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="befristet"
                  checked={mietzeit.befristet}
                  onChange={() => handleChange('befristet', true)}
                />
                <span>Befristet (Zeitmietvertrag)</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {mietzeit.befristet && (
        <div className="card">
          <div className="card-header">
            <div className="accent-bar" />
            <h2>Befristung gemäß §575 BGB</h2>
          </div>
          <div className="card-content">
            <div style={{ 
              padding: '16px', 
              background: 'var(--warning)', 
              borderRadius: '12px',
              color: 'white',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
            }}>
              <MdWarning size={24} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Wichtiger Hinweis:</strong><br />
                Der Befristungsgrund muss dem Mieter bei Vertragsabschluss schriftlich 
                mitgeteilt werden! Ohne gültigen Grund gilt der Vertrag als unbefristet.
              </div>
            </div>
            
            <div className="form-group">
              <label>Mietende *</label>
              <input
                type="date"
                value={mietzeit.mietende || ''}
                onChange={(e) => handleChange('mietende', e.target.value)}
              />
            </div>
            
            <div className="form-group" style={{ marginTop: '16px' }}>
              <label>Befristungsgrund (§575 BGB) *</label>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '12px' }}>
                Ein Mietverhältnis kann nur befristet werden, wenn der Vermieter nach Ablauf:
              </p>
              <ul style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '16px', paddingLeft: '20px' }}>
                <li>die Räume als Wohnung für sich, Familienangehörige oder Haushaltsangehörige nutzen will</li>
                <li>die Räume beseitigen oder wesentlich verändern/instandsetzen will</li>
                <li>die Räume an einen zur Dienstleistung Verpflichteten vermieten will</li>
              </ul>
              <textarea
                value={mietzeit.befristungsgrund || ''}
                onChange={(e) => handleChange('befristungsgrund', e.target.value)}
                placeholder="Der Vermieter beabsichtigt, die Wohnung nach Beendigung des Mietverhältnisses wie folgt zu verwenden: ..."
                style={{ minHeight: '120px' }}
              />
            </div>
          </div>
        </div>
      )}

      {!mietzeit.befristet && (
        <div className="card">
          <div className="card-header">
            <div className="accent-bar" />
            <h2>§3 Kündigung des Vertrages</h2>
          </div>
          <div className="card-content">
            <p style={{ color: 'var(--text-secondary)' }}>
              Bei unbefristeten Mietverträgen gelten die gesetzlichen Kündigungsfristen:
            </p>
            <ul style={{ color: 'var(--text-secondary)', marginTop: '12px', paddingLeft: '20px' }}>
              <li><strong>Mieter:</strong> 3 Monate zum Monatsende</li>
              <li><strong>Vermieter:</strong> 3 Monate (bis 5 Jahre), 6 Monate (bis 8 Jahre), 9 Monate (ab 8 Jahre)</li>
            </ul>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '12px' }}>
              Die vollständigen Kündigungsregelungen (§3) werden automatisch in den Vertrag aufgenommen.
            </p>
          </div>
        </div>
      )}

      <div className="nav-buttons">
        <button className="btn btn-secondary btn-back" onClick={onPrev}>
          <MdChevronLeft size={20} />
          Zurück
        </button>
        <button className="btn btn-primary btn-next" onClick={onNext}>
          Weiter zu Miete
          <MdChevronRight size={20} />
        </button>
      </div>
    </>
  );
}
