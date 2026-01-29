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

const stepTitles = ['Typ', 'Vermieter', 'Mieter', 'Objekt', 'Konditionen', 'Optionen']

export default function ContractForm({ contractType, step, data, updateData, onBack, onNext }: Props) {
  return (
    <div className="space-y-6">
      {/* Simple Step Badge */}
      <div className="step-badge">
        Schritt {step + 1} von 6 · {stepTitles[step]}
      </div>

      {/* Form Content */}
      <div className="form-section">
        {step === 1 && <VermieterForm data={data} updateData={updateData} />}
        {step === 2 && <MieterForm data={data} updateData={updateData} />}
        {step === 3 && <ObjektForm data={data} updateData={updateData} contractType={contractType} />}
        {step === 4 && <KonditionenForm data={data} updateData={updateData} />}
        {step === 5 && <OptionenForm data={data} updateData={updateData} />}
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <button onClick={onBack} className="btn-secondary flex-1">
          Zurück
        </button>
        <button onClick={onNext} className="btn-primary flex-1">
          {step === 5 ? 'Vorschau' : 'Weiter'}
        </button>
      </div>
    </div>
  )
}

// Form Sections

function VermieterForm({ data, updateData }: { data: ContractData, updateData: (u: Partial<ContractData>) => void }) {
  return (
    <div className="space-y-5">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Vermieter-Daten</h3>
      
      <div className="space-y-4">
        <div>
          <label className="form-label">Name / Firma</label>
          <input
            type="text"
            className="form-input"
            placeholder="Max Mustermann"
            value={data.vermieterName}
            onChange={e => updateData({ vermieterName: e.target.value })}
          />
        </div>
        
        <div>
          <label className="form-label">Straße und Hausnummer</label>
          <input
            type="text"
            className="form-input"
            placeholder="Musterstraße 123"
            value={data.vermieterStrasse}
            onChange={e => updateData({ vermieterStrasse: e.target.value })}
          />
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="form-label">PLZ</label>
            <input
              type="text"
              className="form-input"
              placeholder="12345"
              value={data.vermieterPlz}
              onChange={e => updateData({ vermieterPlz: e.target.value })}
            />
          </div>
          <div className="col-span-2">
            <label className="form-label">Ort</label>
            <input
              type="text"
              className="form-input"
              placeholder="Berlin"
              value={data.vermieterOrt}
              onChange={e => updateData({ vermieterOrt: e.target.value })}
            />
          </div>
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
    <div className="space-y-5">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Mieter-Daten</h3>
      
      <div className="space-y-4">
        <div>
          <label className="form-label">Name des Mieters</label>
          <input
            type="text"
            className="form-input"
            placeholder="Maria Musterfrau"
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
    <div className="space-y-5">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Mietobjekt</h3>
      
      <div className="space-y-4">
        <div>
          <label className="form-label">Adresse des Mietobjekts</label>
          <input
            type="text"
            className="form-input"
            placeholder="Neue Straße 10"
            value={data.objektStrasse}
            onChange={e => updateData({ objektStrasse: e.target.value })}
          />
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="form-label">PLZ</label>
            <input
              type="text"
              className="form-input"
              placeholder="12345"
              value={data.objektPlz}
              onChange={e => updateData({ objektPlz: e.target.value })}
            />
          </div>
          <div className="col-span-2">
            <label className="form-label">Ort</label>
            <input
              type="text"
              className="form-input"
              placeholder="Berlin"
              value={data.objektOrt}
              onChange={e => updateData({ objektOrt: e.target.value })}
            />
          </div>
        </div>
        
        {!isGarage && (
          <>
            <div className="grid grid-cols-2 gap-3">
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
                <label className="form-label">Zimmer</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="3"
                  value={data.objektZimmer}
                  onChange={e => updateData({ objektZimmer: e.target.value })}
                />
              </div>
            </div>
            
            <div>
              <label className="form-label">Etage</label>
              <input
                type="text"
                className="form-input"
                placeholder="2. OG links"
                value={data.objektEtage}
                onChange={e => updateData({ objektEtage: e.target.value })}
              />
            </div>
          </>
        )}
        
        <div>
          <label className="form-label">Beschreibung</label>
          <input
            type="text"
            className="form-input"
            placeholder={isGarage ? 'Stellplatz Nr. 15' : '3-Zimmer Altbauwohnung'}
            value={data.objektBeschreibung}
            onChange={e => updateData({ objektBeschreibung: e.target.value })}
          />
        </div>
        
        {!isGarage && (
          <div>
            <label className="form-label mb-3">Ausstattung</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { key: 'hatBalkon', label: 'Balkon/Terrasse' },
                { key: 'hatKeller', label: 'Keller' },
                { key: 'hatStellplatz', label: 'Stellplatz' },
                { key: 'hatEbk', label: 'Einbauküche' },
              ].map(item => (
                <label key={item.key} className="flex items-center gap-3 p-3 rounded-xl 
                             bg-slate-50 dark:bg-slate-700/50 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded border-slate-300 text-cyan-600 
                             focus:ring-cyan-500 dark:border-slate-600 dark:bg-slate-800"
                    checked={data[item.key as keyof ContractData] as boolean}
                    onChange={e => updateData({ [item.key]: e.target.checked })}
                  />
                  <span className="text-sm text-slate-700 dark:text-slate-300">{item.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function KonditionenForm({ data, updateData }: { data: ContractData, updateData: (u: Partial<ContractData>) => void }) {
  return (
    <div className="space-y-5">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Mietkonditionen</h3>
      
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="form-label">Kaltmiete (€)</label>
            <input
              type="number"
              className="form-input"
              placeholder="750"
              value={data.kaltmiete}
              onChange={e => updateData({ kaltmiete: e.target.value })}
            />
          </div>
          <div>
            <label className="form-label">Nebenkosten (€)</label>
            <input
              type="number"
              className="form-input"
              placeholder="150"
              value={data.nebenkosten}
              onChange={e => updateData({ nebenkosten: e.target.value })}
            />
          </div>
        </div>
        
        <div>
          <label className="form-label">Kaution (€)</label>
          <input
            type="number"
            className="form-input"
            placeholder="2250"
            value={data.kaution}
            onChange={e => updateData({ kaution: e.target.value })}
          />
          <p className="text-xs text-slate-500 mt-1">Maximal 3 Kaltmieten</p>
        </div>
        
        <div>
          <label className="form-label">Mietbeginn</label>
          <input
            type="date"
            className="form-input"
            value={data.mietbeginn}
            onChange={e => updateData({ mietbeginn: e.target.value })}
          />
        </div>
        
        <label className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 cursor-pointer">
          <input
            type="checkbox"
            className="w-5 h-5 rounded border-slate-300 text-cyan-600 
                     focus:ring-cyan-500 dark:border-slate-600 dark:bg-slate-800"
            checked={data.befristet}
            onChange={e => updateData({ befristet: e.target.checked })}
          />
          <div>
            <span className="font-medium text-slate-900 dark:text-white">Befristeter Mietvertrag</span>
            <p className="text-xs text-slate-500">Nur mit gesetzlichem Grund (§575 BGB)</p>
          </div>
        </label>
        
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
      </div>
    </div>
  )
}

function OptionenForm({ data, updateData }: { data: ContractData, updateData: (u: Partial<ContractData>) => void }) {
  const options = [
    { key: 'staffelmiete', label: 'Staffelmiete', desc: 'Jährliche Mieterhöhung festlegen' },
    { key: 'indexmiete', label: 'Indexmiete', desc: 'An Verbraucherpreisindex koppeln' },
    { key: 'haustiereErlaubt', label: 'Haustiere erlaubt', desc: 'Kleintierhaltung ist immer erlaubt' },
    { key: 'kleinreparaturklausel', label: 'Kleinreparaturklausel', desc: 'Mieter trägt kleine Reparaturen' },
  ]
  
  return (
    <div className="space-y-5">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Zusätzliche Optionen</h3>
      
      <div className="space-y-2">
        {options.map(opt => (
          <label key={opt.key} className="flex items-center gap-3 p-4 rounded-xl 
                       bg-slate-50 dark:bg-slate-700/50 cursor-pointer">
            <input
              type="checkbox"
              className="w-5 h-5 rounded border-slate-300 text-cyan-600 
                       focus:ring-cyan-500 dark:border-slate-600 dark:bg-slate-800"
              checked={data[opt.key as keyof ContractData] as boolean}
              onChange={e => updateData({ [opt.key]: e.target.checked })}
            />
            <div>
              <span className="font-medium text-slate-900 dark:text-white">{opt.label}</span>
              <p className="text-xs text-slate-500">{opt.desc}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  )
}
