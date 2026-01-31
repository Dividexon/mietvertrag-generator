import { MdChevronLeft, MdPictureAsPdf, MdEdit, MdWarning } from 'react-icons/md';
import type { Mietvertrag } from '../../types';
import { KAUTION_ZAHLUNGSART_OPTIONS } from '../../types';
import { generateMietvertragPDF } from '../../utils/pdfGenerator';

interface Props {
  vertrag: Mietvertrag;
  updateVertrag: (section: keyof Mietvertrag, data: any) => void;
  goToStep: (step: number) => void;
  onPrev: () => void;
}

export function Step10Abschluss({ vertrag, updateVertrag, goToStep, onPrev }: Props) {
  const { vermieter, mieter, mietobjekt, mietzeit, miete, kaution, unterschriften } = vertrag;
  
  // Kaution Validierung: Max 3 Monatsgrundmieten
  const maxKaution = miete.grundmieteGesamt * 3;
  const kautionValid = kaution.betrag <= maxKaution;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('de-DE');
  };

  const handleExportPDF = () => {
    generateMietvertragPDF(vertrag);
  };

  return (
    <>
      {/* Kaution */}
      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>§20 Mietsicherheit (Kaution)</h2>
        </div>
        <div className="card-content">
          <div className="form-row">
            <div className="form-group">
              <label>Kautionshöhe *</label>
              <div className="input-with-suffix">
                <input
                  type="number"
                  value={kaution.betrag || ''}
                  onChange={(e) => updateVertrag('kaution', { betrag: parseFloat(e.target.value) || 0 })}
                  placeholder={maxKaution.toFixed(0)}
                  min="0"
                  max={maxKaution}
                  step="0.01"
                  style={{ borderColor: !kautionValid ? 'var(--error)' : undefined }}
                />
                <span className="suffix">€</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
                Max. 3 Monatsgrundmieten = {maxKaution.toFixed(2)} €
              </p>
            </div>
            <div className="form-group">
              <label>Zahlungsart *</label>
              <select
                value={kaution.zahlungsart}
                onChange={(e) => updateVertrag('kaution', { zahlungsart: e.target.value })}
              >
                <option value="">Bitte wählen</option>
                {KAUTION_ZAHLUNGSART_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
          
          {!kautionValid && (
            <div style={{ 
              marginTop: '12px', 
              padding: '12px', 
              background: 'var(--error)', 
              borderRadius: '12px',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <MdWarning size={20} />
              <span>Kaution darf max. 3 Monatsgrundmieten betragen (§551 BGB)!</span>
            </div>
          )}
        </div>
      </div>

      {/* Unterschriften */}
      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>Vertragsabschluss</h2>
        </div>
        <div className="card-content">
          <div className="form-row">
            <div className="form-group">
              <label>Ort *</label>
              <input
                type="text"
                value={unterschriften.ort}
                onChange={(e) => updateVertrag('unterschriften', { ort: e.target.value })}
                placeholder="Bremen"
              />
            </div>
            <div className="form-group">
              <label>Datum *</label>
              <input
                type="date"
                value={unterschriften.datum}
                onChange={(e) => updateVertrag('unterschriften', { datum: e.target.value })}
              />
            </div>
          </div>
          
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '16px' }}>
            Die Unterschriften werden auf dem gedruckten Vertrag geleistet.
          </p>
        </div>
      </div>

      {/* Zusammenfassung */}
      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>Zusammenfassung</h2>
        </div>
        <div className="card-content">
          {/* Vermieter */}
          <div className="summary-section">
            <h3 onClick={() => goToStep(2)} style={{ cursor: 'pointer' }}>
              Vermieter <MdEdit size={16} style={{ marginLeft: '8px', color: 'var(--accent)' }} />
            </h3>
            <div className="summary-grid">
              <div className="summary-item">
                <span className="label">Name</span>
                <span className="value">{vermieter.name || '—'}</span>
              </div>
              <div className="summary-item">
                <span className="label">Anschrift</span>
                <span className="value">{vermieter.strasse ? `${vermieter.strasse}, ${vermieter.plz} ${vermieter.ort}` : '—'}</span>
              </div>
            </div>
          </div>
          
          {/* Mieter */}
          <div className="summary-section">
            <h3 onClick={() => goToStep(3)} style={{ cursor: 'pointer' }}>
              Mieter ({mieter.length}) <MdEdit size={16} style={{ marginLeft: '8px', color: 'var(--accent)' }} />
            </h3>
            {mieter.map((m, i) => (
              <div key={m.id} className="summary-grid" style={{ marginBottom: i < mieter.length - 1 ? '8px' : 0 }}>
                <div className="summary-item">
                  <span className="label">Name</span>
                  <span className="value">{m.vorname} {m.nachname || '—'}</span>
                </div>
                <div className="summary-item">
                  <span className="label">Geburtsdatum</span>
                  <span className="value">{formatDate(m.geburtsdatum)}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mietobjekt */}
          <div className="summary-section">
            <h3 onClick={() => goToStep(4)} style={{ cursor: 'pointer' }}>
              Mietobjekt <MdEdit size={16} style={{ marginLeft: '8px', color: 'var(--accent)' }} />
            </h3>
            <div className="summary-grid">
              <div className="summary-item">
                <span className="label">Adresse</span>
                <span className="value">{mietobjekt.strasse} {mietobjekt.hausnummer}, {mietobjekt.plz} {mietobjekt.ort}</span>
              </div>
              <div className="summary-item">
                <span className="label">Geschoss</span>
                <span className="value">{mietobjekt.geschoss || '—'}</span>
              </div>
              <div className="summary-item">
                <span className="label">Zimmer</span>
                <span className="value">{mietobjekt.zimmeranzahl}</span>
              </div>
              <div className="summary-item">
                <span className="label">Wohnfläche</span>
                <span className="value">{mietobjekt.wohnflaeche} m²</span>
              </div>
            </div>
          </div>
          
          {/* Mietkonditionen */}
          <div className="summary-section">
            <h3 onClick={() => goToStep(6)} style={{ cursor: 'pointer' }}>
              Miete <MdEdit size={16} style={{ marginLeft: '8px', color: 'var(--accent)' }} />
            </h3>
            <div className="summary-grid">
              <div className="summary-item">
                <span className="label">Mietbeginn</span>
                <span className="value">{formatDate(mietzeit.mietbeginn)}</span>
              </div>
              <div className="summary-item">
                <span className="label">Laufzeit</span>
                <span className="value">{mietzeit.befristet ? `Befristet bis ${formatDate(mietzeit.mietende || '')}` : 'Unbefristet'}</span>
              </div>
              <div className="summary-item">
                <span className="label">Grundmiete</span>
                <span className="value">{miete.grundmieteGesamt.toFixed(2)} €</span>
              </div>
              <div className="summary-item">
                <span className="label">+ Nebenkosten</span>
                <span className="value">{miete.nebenkostenVorauszahlung.toFixed(2)} €</span>
              </div>
              <div className="summary-item">
                <span className="label" style={{ fontWeight: 600 }}>= Gesamtmiete</span>
                <span className="value" style={{ color: 'var(--accent)', fontWeight: 700 }}>{miete.gesamtmiete.toFixed(2)} €</span>
              </div>
              <div className="summary-item">
                <span className="label">Kaution</span>
                <span className="value">{kaution.betrag.toFixed(2)} €</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Export */}
      <div className="nav-buttons" style={{ flexDirection: 'column', gap: '12px' }}>
        <button 
          className="btn btn-primary" 
          onClick={handleExportPDF} 
          style={{ background: 'var(--success)' }}
          disabled={!kautionValid}
        >
          <MdPictureAsPdf size={20} />
          Mietvertrag als PDF exportieren
        </button>
        <button className="btn btn-secondary btn-back" onClick={onPrev} style={{ width: '100%' }}>
          <MdChevronLeft size={20} />
          Zurück
        </button>
      </div>
    </>
  );
}
