import { MdChevronLeft, MdPictureAsPdf, MdEdit } from 'react-icons/md';
import type { Mietvertrag } from '../../types';

interface Props {
  vertrag: Mietvertrag;
  updateVertrag: (section: keyof Mietvertrag, data: any) => void;
  goToStep: (step: number) => void;
  onPrev: () => void;
}

export function Step10Zusammenfassung({ vertrag, updateVertrag, goToStep, onPrev }: Props) {
  const { vermieter, mieter, mietobjekt, mietkonditionen, vertragsdaten } = vertrag;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('de-DE');
  };

  const handleExportPDF = () => {
    // Für jetzt: Print Dialog öffnen
    // TODO: Echte PDF-Generierung mit @react-pdf/renderer
    window.print();
  };

  return (
    <>
      {/* Vermieter */}
      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>👤 Vermieter</h2>
          <button className="collapse-btn" onClick={() => goToStep(1)} title="Bearbeiten">
            <MdEdit />
          </button>
        </div>
        <div className="card-content">
          <div className="summary-grid">
            <div className="summary-item">
              <span className="label">Name</span>
              <span className="value">{vermieter.name || '—'}</span>
            </div>
            <div className="summary-item">
              <span className="label">Anschrift</span>
              <span className="value">{vermieter.anschrift ? `${vermieter.anschrift}, ${vermieter.plz} ${vermieter.ort}` : '—'}</span>
            </div>
            <div className="summary-item">
              <span className="label">Telefon</span>
              <span className="value">{vermieter.telefon || '—'}</span>
            </div>
            <div className="summary-item">
              <span className="label">E-Mail</span>
              <span className="value">{vermieter.email || '—'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mieter */}
      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>👥 Mieter ({mieter.length})</h2>
          <button className="collapse-btn" onClick={() => goToStep(2)} title="Bearbeiten">
            <MdEdit />
          </button>
        </div>
        <div className="card-content">
          {mieter.map((m, i) => (
            <div key={m.id} style={{ marginBottom: i < mieter.length - 1 ? '16px' : 0, paddingBottom: i < mieter.length - 1 ? '16px' : 0, borderBottom: i < mieter.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
              <div className="summary-grid">
                <div className="summary-item">
                  <span className="label">Name</span>
                  <span className="value">{m.vorname} {m.nachname || '—'}</span>
                </div>
                <div className="summary-item">
                  <span className="label">Geburtsdatum</span>
                  <span className="value">{formatDate(m.geburtsdatum)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mietobjekt */}
      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>🏠 Mietobjekt</h2>
          <button className="collapse-btn" onClick={() => goToStep(3)} title="Bearbeiten">
            <MdEdit />
          </button>
        </div>
        <div className="card-content">
          <div className="summary-grid">
            <div className="summary-item">
              <span className="label">Adresse</span>
              <span className="value">{mietobjekt.strasse} {mietobjekt.hausnummer}, {mietobjekt.plz} {mietobjekt.ort}</span>
            </div>
            <div className="summary-item">
              <span className="label">Art</span>
              <span className="value" style={{ textTransform: 'capitalize' }}>{mietobjekt.art || '—'}</span>
            </div>
            <div className="summary-item">
              <span className="label">Wohnfläche</span>
              <span className="value">{mietobjekt.wohnflaeche} m²</span>
            </div>
            <div className="summary-item">
              <span className="label">Zimmer</span>
              <span className="value">{mietobjekt.zimmeranzahl}</span>
            </div>
            <div className="summary-item">
              <span className="label">Etage / Lage</span>
              <span className="value">{mietobjekt.etage || '—'} {mietobjekt.lage ? `/ ${mietobjekt.lage}` : ''}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mietkonditionen */}
      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>💰 Mietkonditionen</h2>
          <button className="collapse-btn" onClick={() => goToStep(5)} title="Bearbeiten">
            <MdEdit />
          </button>
        </div>
        <div className="card-content">
          <div className="summary-grid">
            <div className="summary-item">
              <span className="label">Mietbeginn</span>
              <span className="value">{formatDate(mietkonditionen.mietbeginn)}</span>
            </div>
            <div className="summary-item">
              <span className="label">Vertragslaufzeit</span>
              <span className="value">{mietkonditionen.befristet ? `Befristet bis ${formatDate(mietkonditionen.mietende)}` : 'Unbefristet'}</span>
            </div>
            <div className="summary-item">
              <span className="label">Kaltmiete</span>
              <span className="value">{mietkonditionen.kaltmiete.toFixed(2)} €</span>
            </div>
            <div className="summary-item">
              <span className="label">Nebenkosten</span>
              <span className="value">{mietkonditionen.nebenkostenvorauszahlung.toFixed(2)} €</span>
            </div>
            <div className="summary-item">
              <span className="label">Heizkosten</span>
              <span className="value">{mietkonditionen.heizkostenvorauszahlung.toFixed(2)} €</span>
            </div>
            <div className="summary-item">
              <span className="label" style={{ fontWeight: 600 }}>Gesamtmiete</span>
              <span className="value" style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '1.1rem' }}>{mietkonditionen.gesamtmiete.toFixed(2)} €</span>
            </div>
            <div className="summary-item">
              <span className="label">Kaution</span>
              <span className="value">{mietkonditionen.kaution.toFixed(2)} €</span>
            </div>
          </div>
        </div>
      </div>

      {/* Vertragsdaten */}
      <div className="card">
        <div className="card-header">
          <div className="accent-bar" />
          <h2>✍️ Vertragsabschluss</h2>
        </div>
        <div className="card-content">
          <div className="form-row">
            <div className="form-group">
              <label>Vertragsort</label>
              <input
                type="text"
                value={vertragsdaten.vertragsort}
                onChange={(e) => updateVertrag('vertragsdaten', { vertragsort: e.target.value })}
                placeholder="Bremen"
              />
            </div>
            <div className="form-group">
              <label>Vertragsdatum</label>
              <input
                type="date"
                value={vertragsdaten.vertragsdatum}
                onChange={(e) => updateVertrag('vertragsdaten', { vertragsdatum: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="nav-buttons" style={{ flexDirection: 'column', gap: '12px' }}>
        <button className="btn btn-primary" onClick={handleExportPDF} style={{ background: 'var(--success)' }}>
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
