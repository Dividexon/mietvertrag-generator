'use client'

import { ContractType, ContractData } from '@/app/page'

interface Props {
  data: ContractData
  contractType: ContractType
  onBack: () => void
}

export default function ContractPreview({ data, contractType, onBack }: Props) {
  const typeLabel = contractType === 'wohnung' ? 'Wohnraummietvertrag' : 
                    contractType === 'gewerbe' ? 'Gewerbemietvertrag' : 'Garagenmietvertrag'
  
  const gesamtmiete = (parseFloat(data.kaltmiete) || 0) + (parseFloat(data.nebenkosten) || 0)
  
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '-'
    return new Date(dateStr).toLocaleDateString('de-DE')
  }

  const handleDownloadPDF = () => {
    // TODO: Implement PDF generation
    alert('PDF-Export wird in der nächsten Version verfügbar sein!\n\nDie Vertragsvorlage von Haus & Grund wird hier eingefügt.')
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          📄 Vertragsvorschau
        </h2>
        <div className="flex gap-3">
          <button onClick={onBack} className="btn-secondary">
            ← Bearbeiten
          </button>
          <button onClick={handlePrint} className="btn-secondary">
            🖨️ Drucken
          </button>
          <button onClick={handleDownloadPDF} className="btn-primary">
            📥 PDF herunterladen
          </button>
        </div>
      </div>

      {/* Contract Preview */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 md:p-12 print:shadow-none">
        {/* Contract Header */}
        <div className="text-center border-b-2 border-slate-800 dark:border-slate-200 pb-6 mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            {typeLabel}
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            gemäß §§ 535 ff. BGB
          </p>
        </div>

        {/* Parties */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3 text-lg">
              Vermieter
            </h3>
            <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 space-y-1">
              <p className="font-medium">{data.vermieterName || '-'}</p>
              <p className="text-slate-600 dark:text-slate-400">{data.vermieterStrasse}</p>
              <p className="text-slate-600 dark:text-slate-400">{data.vermieterPlz} {data.vermieterOrt}</p>
              {data.vermieterTelefon && (
                <p className="text-slate-600 dark:text-slate-400">Tel: {data.vermieterTelefon}</p>
              )}
              {data.vermieterEmail && (
                <p className="text-slate-600 dark:text-slate-400">E-Mail: {data.vermieterEmail}</p>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3 text-lg">
              Mieter
            </h3>
            <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 space-y-1">
              <p className="font-medium">{data.mieterName || '-'}</p>
              {data.mieterGeburtsdatum && (
                <p className="text-slate-600 dark:text-slate-400">
                  geb. {formatDate(data.mieterGeburtsdatum)}
                </p>
              )}
              {data.mieterStrasse && (
                <p className="text-slate-600 dark:text-slate-400">
                  Bisherige Anschrift: {data.mieterStrasse}
                </p>
              )}
              {data.mieterTelefon && (
                <p className="text-slate-600 dark:text-slate-400">Tel: {data.mieterTelefon}</p>
              )}
              {data.mieterEmail && (
                <p className="text-slate-600 dark:text-slate-400">E-Mail: {data.mieterEmail}</p>
              )}
            </div>
          </div>
        </div>

        {/* Object */}
        <div className="mb-8">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-3 text-lg">
            § 1 Mietobjekt
          </h3>
          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
            <p className="mb-2">
              <span className="font-medium">Anschrift:</span>{' '}
              {data.objektStrasse}, {data.objektPlz} {data.objektOrt}
            </p>
            {data.objektEtage && (
              <p className="mb-2">
                <span className="font-medium">Lage:</span> {data.objektEtage}
              </p>
            )}
            {data.objektWohnflaeche && (
              <p className="mb-2">
                <span className="font-medium">Wohnfläche:</span> ca. {data.objektWohnflaeche} m²
              </p>
            )}
            {data.objektZimmer && (
              <p className="mb-2">
                <span className="font-medium">Zimmer:</span> {data.objektZimmer}
              </p>
            )}
            {data.objektBeschreibung && (
              <p className="mb-2">
                <span className="font-medium">Beschreibung:</span> {data.objektBeschreibung}
              </p>
            )}
            
            {(data.hatBalkon || data.hatKeller || data.hatStellplatz || data.hatEbk) && (
              <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                <span className="font-medium">Zur Wohnung gehören:</span>
                <ul className="list-disc list-inside ml-2 mt-1 text-slate-600 dark:text-slate-400">
                  {data.hatBalkon && <li>Balkon / Terrasse</li>}
                  {data.hatKeller && <li>Kellerraum</li>}
                  {data.hatStellplatz && <li>PKW-Stellplatz</li>}
                  {data.hatEbk && <li>Einbauküche</li>}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Rent */}
        <div className="mb-8">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-3 text-lg">
            § 2 Miete
          </h3>
          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-slate-500">Kaltmiete</p>
                <p className="text-xl font-semibold">{data.kaltmiete || 0} €</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Nebenkosten-Vorauszahlung</p>
                <p className="text-xl font-semibold">{data.nebenkosten || 0} €</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Gesamtmiete monatlich</p>
                <p className="text-xl font-semibold text-primary">{gesamtmiete.toFixed(2)} €</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
              Die Miete ist monatlich im Voraus, spätestens bis zum 3. Werktag eines jeden Monats, 
              auf das Konto des Vermieters zu überweisen.
            </p>
          </div>
        </div>

        {/* Deposit */}
        <div className="mb-8">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-3 text-lg">
            § 3 Kaution
          </h3>
          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
            <p>
              Der Mieter zahlt eine Kaution in Höhe von <strong>{data.kaution || 0} €</strong>.
            </p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Die Kaution ist gemäß § 551 BGB zu verzinsen und getrennt vom Vermögen des 
              Vermieters anzulegen.
            </p>
          </div>
        </div>

        {/* Duration */}
        <div className="mb-8">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-3 text-lg">
            § 4 Mietdauer
          </h3>
          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
            <p>
              <span className="font-medium">Mietbeginn:</span> {formatDate(data.mietbeginn)}
            </p>
            <p className="mt-2">
              {data.befristet ? (
                <>Das Mietverhältnis ist befristet bis zum {formatDate(data.befristetBis)}.</>
              ) : (
                <>Das Mietverhältnis wird auf unbestimmte Zeit geschlossen.</>
              )}
            </p>
            <p className="mt-2">
              <span className="font-medium">Kündigungsfrist:</span> {data.kuendigungsfrist} Monate 
              zum Monatsende
            </p>
          </div>
        </div>

        {/* Additional Clauses */}
        <div className="mb-8">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-3 text-lg">
            § 5 Besondere Vereinbarungen
          </h3>
          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 space-y-2">
            {data.staffelmiete && (
              <p>✓ Es wurde eine Staffelmiete vereinbart.</p>
            )}
            {data.indexmiete && (
              <p>✓ Es wurde eine Indexmiete vereinbart.</p>
            )}
            {data.haustiereErlaubt && (
              <p>✓ Die Haltung von Haustieren ist gestattet.</p>
            )}
            {data.kleinreparaturklausel && (
              <p>✓ Kleinreparaturen bis 100 € trägt der Mieter (max. 8% der Jahresmiete).</p>
            )}
            {data.schoenheitsreparaturen && (
              <p>✓ Der Mieter übernimmt die Schönheitsreparaturen.</p>
            )}
            {!data.staffelmiete && !data.indexmiete && !data.haustiereErlaubt && 
             !data.kleinreparaturklausel && !data.schoenheitsreparaturen && (
              <p className="text-slate-500">Keine besonderen Vereinbarungen.</p>
            )}
          </div>
        </div>

        {/* Signature Fields */}
        <div className="border-t-2 border-slate-300 dark:border-slate-600 pt-8 mt-12">
          <p className="text-center text-slate-600 dark:text-slate-400 mb-8">
            Beide Parteien haben diesen Vertrag gelesen und sind mit dem Inhalt einverstanden.
          </p>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="border-b-2 border-slate-400 dark:border-slate-500 h-16 mb-2"></div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Ort, Datum, Unterschrift Vermieter
              </p>
            </div>
            <div>
              <div className="border-b-2 border-slate-400 dark:border-slate-500 h-16 mb-2"></div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Ort, Datum, Unterschrift Mieter
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-700 text-center">
          <p className="text-xs text-slate-500">
            Erstellt mit Mariplex Mietvertrag Generator · {new Date().toLocaleDateString('de-DE')}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Dieser Vertrag ersetzt keine Rechtsberatung. Bei Fragen wenden Sie sich an einen Fachanwalt.
          </p>
        </div>
      </div>

      {/* Action Buttons (bottom) */}
      <div className="flex justify-center gap-4 print:hidden">
        <button onClick={onBack} className="btn-secondary">
          ← Zurück zur Bearbeitung
        </button>
        <button onClick={handleDownloadPDF} className="btn-primary text-lg px-8">
          📥 Vertrag als PDF herunterladen
        </button>
      </div>

      {/* Placeholder Notice */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 text-center print:hidden">
        <p className="text-blue-800 dark:text-blue-200">
          ℹ️ <strong>Hinweis:</strong> Dies ist ein Vorschau-Template. Die finalen Vertragsklauseln 
          werden nach Integration der Haus & Grund Vorlage rechtssicher formatiert.
        </p>
      </div>
    </div>
  )
}
