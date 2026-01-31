import { useState } from 'react';
import { MdClose, MdEdit, MdPictureAsPdf } from 'react-icons/md';
import { SignaturePad } from './SignaturePad';
import type { Mietvertrag } from '../types';
import { generateMietvertragPDF } from '../utils/pdfGenerator';

interface Props {
  vertrag: Mietvertrag;
  onClose: () => void;
  onUpdateSignature: (type: 'vermieter' | 'mieter', index: number, signature: string) => void;
  savedSignatures: SavedSignature[];
  onSaveSignatureTemplate: (name: string, signature: string) => void;
}

export interface SavedSignature {
  id: string;
  name: string;
  signature: string;
  createdAt: string;
}

export function ContractPreview({ 
  vertrag, 
  onClose, 
  onUpdateSignature,
  savedSignatures,
  onSaveSignatureTemplate,
}: Props) {
  const [showSignaturePad, setShowSignaturePad] = useState<{
    type: 'vermieter' | 'mieter';
    index: number;
  } | null>(null);
  const [showSavedSignatures, setShowSavedSignatures] = useState<{
    type: 'vermieter' | 'mieter';
    index: number;
  } | null>(null);
  const [saveAsTemplate, setSaveAsTemplate] = useState(false);
  const [templateName, setTemplateName] = useState('');

  const { vermieter, mieter, mietobjekt, mietzeit, miete, kaution, unterschriften } = vertrag;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('de-DE');
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
  };

  const handleSignatureComplete = (signature: string) => {
    if (!showSignaturePad) return;
    
    onUpdateSignature(showSignaturePad.type, showSignaturePad.index, signature);
    
    if (saveAsTemplate && templateName.trim()) {
      onSaveSignatureTemplate(templateName.trim(), signature);
    }
    
    setShowSignaturePad(null);
    setSaveAsTemplate(false);
    setTemplateName('');
  };

  const handleUseSavedSignature = (signature: string) => {
    if (!showSavedSignatures) return;
    
    onUpdateSignature(showSavedSignatures.type, showSavedSignatures.index, signature);
    setShowSavedSignatures(null);
  };

  const handleExportPDF = () => {
    generateMietvertragPDF(vertrag);
  };

  return (
    <div className="preview-modal-overlay">
      <div className="preview-modal">
        {/* Header */}
        <div className="preview-header">
          <h2>Mietvertrag Vorschau</h2>
          <div className="preview-header-actions">
            <button className="preview-header-btn" onClick={handleExportPDF}>
              <MdPictureAsPdf size={20} />
              PDF
            </button>
            <button className="preview-close" onClick={onClose}>
              <MdClose size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="preview-content">
          {/* Title */}
          <div className="preview-title">
            <h1>MIETVERTRAG</h1>
            <p>für {vertrag.vertragsart === 'wohnraum' ? 'Wohnraum' : 
                    vertrag.vertragsart === 'gewerbe' ? 'Gewerberäume' : 'Garage/Stellplatz'}</p>
          </div>

          {/* Vertragsparteien */}
          <div className="preview-section">
            <h3>§1 Vertragsparteien</h3>
            <div className="preview-parties">
              <div className="preview-party">
                <span className="preview-party-label">Vermieter</span>
                <p className="preview-party-name">{vermieter.name || '—'}</p>
                <p className="preview-party-address">
                  {vermieter.strasse}, {vermieter.plz} {vermieter.ort}
                </p>
              </div>
              <div className="preview-party">
                <span className="preview-party-label">Mieter</span>
                {mieter.map((m) => (
                  <div key={m.id}>
                    <p className="preview-party-name">{m.vorname} {m.nachname}</p>
                    <p className="preview-party-address">geb. {formatDate(m.geburtsdatum)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mietobjekt */}
          <div className="preview-section">
            <h3>§2 Mietobjekt</h3>
            <p><strong>Adresse:</strong> {mietobjekt.strasse} {mietobjekt.hausnummer}, {mietobjekt.plz} {mietobjekt.ort}</p>
            <p><strong>Geschoss:</strong> {mietobjekt.geschoss || '—'}</p>
            <p><strong>Wohnfläche:</strong> ca. {mietobjekt.wohnflaeche} m²</p>
            <p><strong>Zimmer:</strong> {mietobjekt.zimmeranzahl}</p>
          </div>

          {/* Mietzeit */}
          <div className="preview-section">
            <h3>§3 Mietzeit</h3>
            <p><strong>Mietbeginn:</strong> {formatDate(mietzeit.mietbeginn)}</p>
            <p><strong>Laufzeit:</strong> {mietzeit.befristet ? `Befristet bis ${formatDate(mietzeit.mietende || '')}` : 'Unbefristet'}</p>
          </div>

          {/* Miete */}
          <div className="preview-section">
            <h3>§4 Miete</h3>
            <div className="preview-miete">
              <div className="preview-miete-row">
                <span>Grundmiete</span>
                <span>{formatCurrency(miete.grundmieteGesamt)}</span>
              </div>
              <div className="preview-miete-row">
                <span>+ Nebenkosten-Vorauszahlung</span>
                <span>{formatCurrency(miete.nebenkostenVorauszahlung)}</span>
              </div>
              <div className="preview-miete-row total">
                <span>Gesamtmiete monatlich</span>
                <span>{formatCurrency(miete.gesamtmiete)}</span>
              </div>
            </div>
          </div>

          {/* Kaution */}
          <div className="preview-section">
            <h3>§5 Kaution</h3>
            <p><strong>Betrag:</strong> {formatCurrency(kaution.betrag)}</p>
          </div>

          {/* Unterschriften */}
          <div className="preview-section signatures">
            <h3>Unterschriften</h3>
            <p className="preview-date">
              {unterschriften.ort || '_______________'}, den {formatDate(unterschriften.datum) || '_______________'}
            </p>
            
            <div className="preview-signatures">
              {/* Vermieter Unterschrift */}
              <div className="preview-signature-box">
                <div 
                  className="preview-signature-area"
                  onClick={() => {
                    if (unterschriften.vermieterSignatur) {
                      // Already signed - option to change
                      setShowSignaturePad({ type: 'vermieter', index: 0 });
                    } else {
                      setShowSavedSignatures({ type: 'vermieter', index: 0 });
                    }
                  }}
                >
                  {unterschriften.vermieterSignatur ? (
                    <img src={unterschriften.vermieterSignatur} alt="Unterschrift Vermieter" />
                  ) : (
                    <span className="preview-signature-placeholder">
                      <MdEdit size={20} />
                      Hier unterschreiben
                    </span>
                  )}
                </div>
                <div className="preview-signature-line" />
                <span className="preview-signature-label">Vermieter</span>
              </div>

              {/* Mieter Unterschriften */}
              {mieter.map((m, index) => (
                <div key={m.id} className="preview-signature-box">
                  <div 
                    className="preview-signature-area"
                    onClick={() => {
                      if (unterschriften.mieterSignaturen?.[index]) {
                        setShowSignaturePad({ type: 'mieter', index });
                      } else {
                        setShowSavedSignatures({ type: 'mieter', index });
                      }
                    }}
                  >
                    {unterschriften.mieterSignaturen?.[index] ? (
                      <img src={unterschriften.mieterSignaturen[index]} alt={`Unterschrift ${m.vorname}`} />
                    ) : (
                      <span className="preview-signature-placeholder">
                        <MdEdit size={20} />
                        Hier unterschreiben
                      </span>
                    )}
                  </div>
                  <div className="preview-signature-line" />
                  <span className="preview-signature-label">
                    Mieter {mieter.length > 1 ? index + 1 : ''}: {m.vorname} {m.nachname}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Signature Selection Modal */}
        {showSavedSignatures && (
          <div className="signature-select-modal">
            <div className="signature-select-content">
              <h3>Unterschrift wählen</h3>
              
              {savedSignatures.length > 0 && (
                <div className="signature-select-saved">
                  <h4>Gespeicherte Unterschriften</h4>
                  <div className="signature-select-list">
                    {savedSignatures.map(sig => (
                      <button
                        key={sig.id}
                        className="signature-select-item"
                        onClick={() => handleUseSavedSignature(sig.signature)}
                      >
                        <img src={sig.signature} alt={sig.name} />
                        <span>{sig.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button 
                className="signature-select-new"
                onClick={() => {
                  setShowSignaturePad(showSavedSignatures);
                  setShowSavedSignatures(null);
                }}
              >
                <MdEdit size={20} />
                Neue Unterschrift erstellen
              </button>

              <button 
                className="signature-select-cancel"
                onClick={() => setShowSavedSignatures(null)}
              >
                Abbrechen
              </button>
            </div>
          </div>
        )}

        {/* Signature Pad Modal */}
        {showSignaturePad && (
          <>
            <SignaturePad
              onSave={handleSignatureComplete}
              onCancel={() => {
                setShowSignaturePad(null);
                setSaveAsTemplate(false);
                setTemplateName('');
              }}
            />
            <div className="signature-save-template">
              <label>
                <input
                  type="checkbox"
                  checked={saveAsTemplate}
                  onChange={e => setSaveAsTemplate(e.target.checked)}
                />
                Als Vorlage speichern
              </label>
              {saveAsTemplate && (
                <input
                  type="text"
                  placeholder="Name der Unterschrift"
                  value={templateName}
                  onChange={e => setTemplateName(e.target.value)}
                  className="signature-template-name"
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
