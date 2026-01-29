'use client'

import { ContractType } from '@/app/page'

interface Props {
  onSelect: (type: ContractType) => void
}

const contractTypes = [
  {
    id: 'wohnung' as const,
    icon: '🏠',
    title: 'Wohnraum',
    description: 'Wohnungen und Häuser',
  },
  {
    id: 'gewerbe' as const,
    icon: '🏢',
    title: 'Gewerbe',
    description: 'Büros, Läden, Gewerberäume',
  },
  {
    id: 'garage' as const,
    icon: '🚗',
    title: 'Garage / Stellplatz',
    description: 'Garagen und Parkplätze',
  },
]

export default function ContractTypeSelector({ onSelect }: Props) {
  return (
    <div className="space-y-6">
      {/* Step Badge */}
      <div className="step-badge">
        Schritt 1 von 6
      </div>

      {/* Title */}
      <div>
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-1">
          Vertragstyp wählen
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Welche Art von Mietvertrag möchten Sie erstellen?
        </p>
      </div>

      {/* Selection Cards */}
      <div className="space-y-3">
        {contractTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onSelect(type.id)}
            className="selection-card w-full text-left flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700 
                          flex items-center justify-center text-2xl flex-shrink-0">
              {type.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-900 dark:text-white">
                {type.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {type.description}
              </p>
            </div>
            <svg 
              className="w-5 h-5 text-slate-400 flex-shrink-0" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ))}
      </div>

      {/* Info Box */}
      <div className="info-box flex items-start gap-3">
        <span className="text-lg">💡</span>
        <p>
          Alle Verträge basieren auf aktueller Rechtsprechung und können individuell angepasst werden.
        </p>
      </div>
    </div>
  )
}
