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

  const handlePrint = () => window.print()

  return (
    <div className="space-y-6">
      {/* Step Badge */}
      <div className="step-badge">
        Vorschau · {typeLabel}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button onClick={onBack} className="btn-secondary flex-1">
          Bearbeiten
        </button>
        <button onClick={handlePrint} className="btn-primary flex-1">
          Drucken
        </button>
      </div>

      {/* Contract Preview */}
      <div className="card space-y-6 print:shadow-none print:border-none">
        {/* Title */}
        <div className="text-center pb-6 border-b border-slate-200 dark:border-slate-700">
          <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
            {typeLabel}
          </h1>
          <p className="text-sm text-slate-500">
            Mietbeginn: {formatDate(data.mietbeginn)}
          </p>
        </div>

        {/* Vertragsparteien */}
        <Section title="§1 Vertragsparteien">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-slate-500 mb-1">Vermieter</p>
              <p className="font-medium text-slate-900 dark:text-white">{data.vermieterName || '-'}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">{data.vermieterStrasse}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">{data.vermieterPlz} {data.vermieterOrt}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Mieter</p>
              <p className="font-medium text-slate-900 dark:text-white">{data.mieterName || '-'}</p>
              {data.mieterGeburtsdatum && (
                <p className="text-sm text-slate-600 dark:text-slate-400">geb. {formatDate(data.mieterGeburtsdatum)}</p>
              )}
            </div>
          </div>
        </Section>

        {/* Mietobjekt */}
        <Section title="§2 Mietobjekt">
          <p className="font-medium text-slate-900 dark:text-white">{data.objektStrasse}</p>
          <p className="text-slate-600 dark:text-slate-400">{data.objektPlz} {data.objektOrt}</p>
          {data.objektWohnflaeche && (
            <p className="text-sm text-slate-500 mt-2">
              {data.objektWohnflaeche} m² · {data.objektZimmer} Zimmer · {data.objektEtage}
            </p>
          )}
          {data.objektBeschreibung && (
            <p className="text-sm text-slate-500">{data.objektBeschreibung}</p>
          )}
        </Section>

        {/* Miete */}
        <Section title="§3 Miete">
          <div className="space-y-2">
            <Row label="Kaltmiete" value={`${data.kaltmiete || 0} €`} />
            <Row label="Nebenkosten" value={`${data.nebenkosten || 0} €`} />
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
              <Row label="Gesamtmiete" value={`${gesamtmiete.toFixed(2)} €`} bold />
            </div>
            <Row label="Kaution" value={`${data.kaution || 0} €`} />
          </div>
        </Section>

        {/* Mietzeit */}
        <Section title="§4 Mietzeit">
          <p className="text-slate-600 dark:text-slate-400">
            {data.befristet 
              ? `Befristet vom ${formatDate(data.mietbeginn)} bis ${formatDate(data.befristetBis)}`
              : `Unbefristet ab ${formatDate(data.mietbeginn)}`
            }
          </p>
          <p className="text-sm text-slate-500 mt-1">
            Kündigungsfrist: {data.kuendigungsfrist || 3} Monate
          </p>
        </Section>

        {/* Optionen */}
        <Section title="§5 Besondere Vereinbarungen">
          <ul className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
            {data.staffelmiete && <li>• Staffelmiete vereinbart</li>}
            {data.indexmiete && <li>• Indexmiete vereinbart</li>}
            {data.haustiereErlaubt && <li>• Haustierhaltung erlaubt</li>}
            {data.kleinreparaturklausel && <li>• Kleinreparaturklausel (bis 100€/Fall)</li>}
            {!data.staffelmiete && !data.indexmiete && !data.haustiereErlaubt && !data.kleinreparaturklausel && (
              <li className="text-slate-400">Keine besonderen Vereinbarungen</li>
            )}
          </ul>
        </Section>

        {/* Unterschriften */}
        <div className="pt-8 mt-8 border-t border-slate-200 dark:border-slate-700">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="h-16 border-b border-slate-300 dark:border-slate-600 mb-2" />
              <p className="text-xs text-slate-500">Ort, Datum, Unterschrift Vermieter</p>
            </div>
            <div>
              <div className="h-16 border-b border-slate-300 dark:border-slate-600 mb-2" />
              <p className="text-xs text-slate-500">Ort, Datum, Unterschrift Mieter</p>
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="info-box">
        💡 Dies ist eine Vorschau. Für den vollständigen Vertrag mit allen Klauseln nutzen Sie die PDF-Funktion.
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 mb-3">{title}</h3>
      {children}
    </div>
  )
}

function Row({ label, value, bold }: { label: string, value: string, bold?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-slate-600 dark:text-slate-400">{label}</span>
      <span className={bold ? 'font-semibold text-slate-900 dark:text-white' : 'text-slate-900 dark:text-white'}>
        {value}
      </span>
    </div>
  )
}
