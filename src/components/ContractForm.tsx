'use client'

import { ContractType, ContractData } from '@/app/page'

interface Props {
  contractType: ContractType
  step: number
  data: ContractData
  updateData: (updates: Partial<ContractData>) => void
  onBack: () => void
  onNext: () => void
}

const steps = [
  { id: 0, title: 'Typ' },
  { id: 1, title: 'Vermieter' },
  { id: 2, title: 'Mieter' },
  { id: 3, title: 'Objekt' },
  { id: 4, title: 'Konditionen' },
  { id: 5, title: 'Optionen' },
]

export default function ContractForm({ contractType, step, data, updateData, onBack, onNext }: Props) {
  const typeLabel = contractType === 'wohnung' ? 'Wohnraum' : 
                    contractType === 'gewerbe' ? 'Gewerbe' : 'Garage'

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center">
            <div className={`step-indicator ${
              step > s.id ? 'completed' : step === s.id ? 'active' : 'pending'
            }`}>
              {step > s.id ? '✓' : s.id}
            </div>
            <span className={`ml-2 text-sm hidden sm:inline ${
              step >= s.id ? 'text-gray-900 dark:text-white' : 'text-gray-400'
            }`}>
              {s.title}
            </span>
            {i < steps.length - 1 && (
              <div className={`w-8 sm:w-16 h-0.5 mx-2 ${
                step > s.id ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Form Content */}
      <div className="form-section">
        {step === 1 && (
          <VermieterForm data={data} updateData={updateData} />
        )}
        {step === 2 && (
          <MieterForm data={data} updateData={updateData} />
        )}
        {step === 3 && (
          <ObjektForm data={data} updateData={updateData} contractType={contractType} />
        )}
        {step === 4 && (
          <KonditionenForm data={data} updateData={updateData} />
        )}
        {step === 5 && (
          <OptionenForm data={data} updateData={updateData} />
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button onClick={onBack} className="btn-secondary">
          ← Zurück
        </button>
        <button onClick={onNext} className="btn-primary">
          {step === 5 ? 'Vorschau anzeigen →' : 'Weiter →'}
        </button>
      </div>
    </div>
  )
}

// Form Sections

function VermieterForm({ data, updateData }: { data: ContractData, updateData: (u: Partial<ContractData>) => void }) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">👤 Vermieter-Daten</h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="form-label">Name / Firma *</label>
          <input
            type="text"
            className="form-input"
            placeholder="Max Mustermann oder Mustermann GmbH"
            value={data.vermieterName}
            onChange={e => updateData({ vermieterName: e.target.value })}
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="form-label">Straße und Hausnummer *</label>
          <input
            type="text"
            className="form-input"
            placeholder="Musterstraße 123"
            value={data.vermieterStrasse}
            onChange={e => updateData({ vermieterStrasse: e.target.value })}
          />
        </div>
        
        <div>
          <label className="form-label">PLZ *</label>
          <input
            type="text"
            className="form-input"
            placeholder="12345"
            value={data.vermieterPlz}
            onChange={e => updateData({ vermieterPlz: e.target.value })}
          />
        </div>
        
        <div>
          <label className="form-label">Ort *</label>
          <input
            type="text"
            className="form-input"
            placeholder="Musterstadt"
            value={data.vermieterOrt}
            onChange={e => updateData({ vermieterOrt: e.target.value })}
          />
        </div>
        
        <div>
          <label className="form-label">Telefon</label>
          <input
            type="tel"
            className="form-input"
            placeholder="+49 123 456789"
            value={data.vermieterTelefon}
            onChange={e => updateData({ vermieterTelefon: e.target.value })}
          />
        </div>
        
        <div>
          <label className="form-label">E-Mail</label>
          <input
            type="email"
            className="form-input"
            placeholder="email@example.com"
            value={data.vermieterEmail}
            onChange={e => updateData({ vermieterEmail: e.target.value })}
          />
        </div>
      </div>
    </div>
  )
}

function MieterForm({ data, updateData }: { data: ContractData, updateData: (u: Partial<ContractData>) => void }) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">👥 Mieter-Daten</h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="form-label">Name(n) des Mieters *</label>
          <input
            type="text"
            className="form-input"
            placeholder="Maria Musterfrau (bei mehreren: kommagetrennt)"
            value={data.mieterName}
            onChange={e => updateData({ mieterName: e.target.value })}
          />
        </div>
        
        <div>
          <label className="form-label">Geburtsdatum</label>
          <input
            type="date"
            className="form-input"
            value={data.mieterGeburtsdatum}
            onChange={e => updateData({ mieterGeburtsdatum: e.target.value })}
          />
        </div>
        
        <div>
          <label className="form-label">Aktuelle Anschrift</label>
          <input
            type="text"
            className="form-input"
            placeholder="Alte Straße 1, 12345 Altstadt"
            value={data.mieterStrasse}
            onChange={e => updateData({ mieterStrasse: e.target.value })}
          />
        </div>
        
        <div>
          <label className="form-label">Telefon</label>
          <input
            type="tel"
            className="form-input"
            placeholder="+49 123 456789"
            value={data.mieterTelefon}
            onChange={e => updateData({ mieterTelefon: e.target.value })}
          />
        </div>
        
        <div>
          <label className="form-label">E-Mail</label>
          <input
            type="email"
            className="form-input"
            placeholder="mieter@example.com"
            value={data.mieterEmail}
            onChange={e => updateData({ mieterEmail: e.target.value })}
          />
        </div>
      </div>
    </div>
  )
}

function ObjektForm({ data, updateData, contractType }: { 
  data: ContractData, 
  updateData: (u: Partial<ContractData>) => void,
  contractType: ContractType 
}) {
  const isGarage = contractType === 'garage'
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        🏠 Mietobjekt
      </h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="form-label">Adresse des Mietobjekts *</label>
          <input
            type="text"
            className="form-input"
            placeholder="Neue Straße 10"
            value={data.objektStrasse}
            onChange={e => updateData({ objektStrasse: e.target.value })}
          />
        </div>
        
        <div>
          <label className="form-label">PLZ *</label>
          <input
            type="text"
            className="form-input"
            placeholder="12345"
            value={data.objektPlz}
            onChange={e => updateData({ objektPlz: e.target.value })}
          />
        </div>
        
        <div>
          <label className="form-label">Ort *</label>
          <input
            type="text"
            className="form-input"
            placeholder="Musterstadt"
            value={data.objektOrt}
            onChange={e => updateData({ objektOrt: e.target.value })}
          />
        </div>
        
        {!isGarage && (
          <>
            <div>
              <label className="form-label">Etage</label>
              <input
                type="text"
                className="form-input"
                placeholder="z.B. 2. OG links"
                value={data.objektEtage}
                onChange={e => updateData({ objektEtage: e.target.value })}
              />
            </div>
            
            <div>
              <label className="form-label">Wohnfläche (m²)</label>
              <input
                type="number"
                className="form-input"
                placeholder="75"
                value={data.objektWohnflaeche}
                onChange={e => updateData({ objektWohnflaeche: e.target.value })}
              />
            </div>
            
            <div>
              <label className="form-label">Anzahl Zimmer</label>
              <input
                type="text"
                className="form-input"
                placeholder="3"
                value={data.objektZimmer}
                onChange={e => updateData({ objektZimmer: e.target.value })}
              />
            </div>
          </>
        )}
        
        <div className={isGarage ? '' : 'md:col-span-2'}>
          <label className="form-label">Beschreibung / Nummer</label>
          <input
            type="text"
            className="form-input"
            placeholder={isGarage ? 'z.B. Stellplatz Nr. 15' : 'z.B. 3-Zimmer Altbauwohnung'}
            value={data.objektBeschreibung}
            onChange={e => updateData({ objektBeschreibung: e.target.value })}
          />
        </div>
      </div>
      
      {!isGarage && (
        <div>
          <label className="form-label mb-3">Ausstattung</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { key: 'hatBalkon', label: '🌿 Balkon/Terrasse' },
              { key: 'hatKeller', label: '📦 Keller' },
              { key: 'hatStellplatz', label: '🚗 Stellplatz' },
              { key: 'hatEbk', label: '🍳 Einbauküche' },
            ].map(item => (
              <label key={item.key} className="flex items-center gap-2 p-3 rounded-lg border 
                           border-gray-200 dark:border-gray-700 cursor-pointer
                           hover:bg-gray-50 dark:hover:bg-gray-800">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary rounded"
                  checked={data[item.key as keyof ContractData] as boolean}
                  onChange={e => updateData({ [item.key]: e.target.checked })}
                />
                <span className="text-sm">{item.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function KonditionenForm({ data, updateData }: { data: ContractData, updateData: (u: Partial<ContractData>) => void }) {
  const kaltmiete = parseFloat(data.kaltmiete) || 0
  const maxKaution = kaltmiete * 3
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">💰 Mietkonditionen</h3>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="form-label">Kaltmiete (€/Monat) *</label>
          <input
            type="number"
            className="form-input"
            placeholder="750"
            value={data.kaltmiete}
            onChange={e => updateData({ kaltmiete: e.target.value })}
          />
        </div>
        
        <div>
          <label className="form-label">Nebenkosten-Vorauszahlung (€/Monat)</label>
          <input
            type="number"
            className="form-input"
            placeholder="150"
            value={data.nebenkosten}
            onChange={e => updateData({ nebenkosten: e.target.value })}
          />
        </div>
        
        <div>
          <label className="form-label">
            Kaution (€) 
            {kaltmiete > 0 && (
              <span className="text-xs text-gray-500 ml-2">
                (max. {maxKaution.toFixed(2)}€ = 3 Kaltmieten)
              </span>
            )}
          </label>
          <input
            type="number"
            className="form-input"
            placeholder="2250"
            value={data.kaution}
            onChange={e => updateData({ kaution: e.target.value })}
          />
        </div>
        
        <div>
          <label className="form-label">Mietbeginn *</label>
          <input
            type="date"
            className="form-input"
            value={data.mietbeginn}
            onChange={e => updateData({ mietbeginn: e.target.value })}
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 
                         dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
            <input
              type="checkbox"
              className="w-5 h-5 text-primary rounded"
              checked={data.befristet}
              onChange={e => updateData({ befristet: e.target.checked })}
            />
            <div>
              <span className="font-medium">Befristeter Mietvertrag</span>
              <p className="text-sm text-gray-500">Nur mit gesetzlichem Grund möglich (§575 BGB)</p>
            </div>
          </label>
        </div>
        
        {data.befristet && (
          <div>
            <label className="form-label">Befristet bis</label>
            <input
              type="date"
              className="form-input"
              value={data.befristetBis}
              onChange={e => updateData({ befristetBis: e.target.value })}
            />
          </div>
        )}
        
        <div>
          <label className="form-label">Kündigungsfrist (Monate)</label>
          <select
            className="form-input"
            value={data.kuendigungsfrist}
            onChange={e => updateData({ kuendigungsfrist: e.target.value })}
          >
            <option value="3">3 Monate (Standard)</option>
            <option value="1">1 Monat</option>
            <option value="2">2 Monate</option>
            <option value="6">6 Monate</option>
          </select>
        </div>
      </div>
    </div>
  )
}

function OptionenForm({ data, updateData }: { data: ContractData, updateData: (u: Partial<ContractData>) => void }) {
  const options = [
    { key: 'staffelmiete', label: '📈 Staffelmiete', desc: 'Jährliche Mieterhöhung festlegen' },
    { key: 'indexmiete', label: '📊 Indexmiete', desc: 'Miete an Verbraucherpreisindex koppeln' },
    { key: 'haustiereErlaubt', label: '🐕 Haustiere erlaubt', desc: 'Kleintierhaltung ist immer erlaubt' },
    { key: 'kleinreparaturklausel', label: '🔧 Kleinreparaturklausel', desc: 'Mieter trägt kleine Reparaturen (bis 100€)' },
    { key: 'schoenheitsreparaturen', label: '🎨 Schönheitsreparaturen', desc: 'Mieter muss bei Auszug renovieren' },
  ]
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">⚙️ Zusätzliche Optionen</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm">
        Wählen Sie optionale Vertragsklauseln. Die Standardeinstellungen sind bereits rechtssicher.
      </p>
      
      <div className="space-y-3">
        {options.map(opt => (
          <label key={opt.key} className="flex items-start gap-3 p-4 rounded-lg border 
                       border-gray-200 dark:border-gray-700 cursor-pointer
                       hover:bg-gray-50 dark:hover:bg-gray-800">
            <input
              type="checkbox"
              className="w-5 h-5 text-primary rounded mt-0.5"
              checked={data[opt.key as keyof ContractData] as boolean}
              onChange={e => updateData({ [opt.key]: e.target.checked })}
            />
            <div>
              <span className="font-medium">{opt.label}</span>
              <p className="text-sm text-gray-500">{opt.desc}</p>
            </div>
          </label>
        ))}
      </div>
      
      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 text-sm">
        <p className="text-yellow-800 dark:text-yellow-200">
          ⚠️ <strong>Hinweis:</strong> Die Schönheitsreparatur-Klausel kann unter Umständen 
          unwirksam sein. Wir empfehlen, dies im Einzelfall prüfen zu lassen.
        </p>
      </div>
    </div>
  )
}
