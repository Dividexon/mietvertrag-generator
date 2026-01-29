'use client'

import { ContractType } from '@/app/page'

interface Props {
  onSelect: (type: ContractType) => void
}

const contractTypes = [
  {
    id: 'wohnung' as const,
    emoji: '🏠',
    title: 'Wohnraum',
    description: 'Mietvertrag für Wohnungen und Häuser',
    gradient: 'from-cyan-500 to-blue-500',
    shadowColor: 'shadow-cyan-500/20',
    features: ['Unbefristet oder befristet', 'Staffel- oder Indexmiete', 'Nebenkosten-Regelung'],
  },
  {
    id: 'gewerbe' as const,
    emoji: '🏢',
    title: 'Gewerbe',
    description: 'Mietvertrag für Büros, Läden und Gewerberäume',
    gradient: 'from-violet-500 to-purple-500',
    shadowColor: 'shadow-violet-500/20',
    features: ['Gewerbliche Nutzung', 'Umsatzsteuer-Option', 'Konkurrenzschutz'],
  },
  {
    id: 'garage' as const,
    emoji: '🚗',
    title: 'Garage / Stellplatz',
    description: 'Mietvertrag für Garagen und Stellplätze',
    gradient: 'from-amber-500 to-orange-500',
    shadowColor: 'shadow-amber-500/20',
    features: ['Separate Kündigung', 'Nutzungsregeln', 'Haftung'],
  },
]

export default function ContractTypeSelector({ onSelect }: Props) {
  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 dark:bg-cyan-900/30 
                      rounded-full text-cyan-700 dark:text-cyan-400 text-sm font-medium">
          <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>
          Rechtssicher & aktuell
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white">
          Welchen <span className="text-gradient">Mietvertrag</span> benötigen Sie?
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Wählen Sie die Art des Mietvertrags. Alle Verträge entsprechen den aktuellen 
          rechtlichen Anforderungen.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {contractTypes.map((type, index) => (
          <button
            key={type.id}
            onClick={() => onSelect(type.id)}
            className="group relative text-left animate-in slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`card hover:${type.shadowColor} hover:shadow-2xl`}>
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${type.gradient} 
                            flex items-center justify-center text-3xl mb-6
                            shadow-lg ${type.shadowColor}
                            group-hover:scale-110 group-hover:rotate-3 
                            transition-transform duration-300`}>
                {type.emoji}
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 
                           group-hover:text-cyan-600 dark:group-hover:text-cyan-400 
                           transition-colors duration-200">
                {type.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                {type.description}
              </p>
              
              {/* Features */}
              <ul className="space-y-3 mb-6">
                {type.features.map((feature, i) => (
                  <li key={i} className="feature-item text-slate-600 dark:text-slate-400">
                    <span className="icon">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              {/* CTA */}
              <div className="flex items-center text-cyan-600 dark:text-cyan-400 font-semibold text-sm
                            group-hover:gap-3 gap-2 transition-all duration-200">
                Vertrag erstellen
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" 
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Tip Section */}
      <div className="tip-box">
        <div className="tip-box-icon">💡</div>
        <div>
          <p className="font-semibold text-cyan-900 dark:text-cyan-100 mb-1">
            Gut zu wissen
          </p>
          <p className="text-sm text-cyan-700 dark:text-cyan-300">
            Unsere Verträge basieren auf aktueller Rechtsprechung (Stand 2026) 
            und werden regelmäßig von Rechtsexperten überprüft.
          </p>
        </div>
      </div>
    </div>
  )
}
