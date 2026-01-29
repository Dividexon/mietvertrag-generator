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
    price: 'Ab 12€ bei Haus & Grund',
    features: ['Unbefristet oder befristet', 'Staffel- oder Indexmiete', 'Nebenkosten-Regelung'],
  },
  {
    id: 'gewerbe' as const,
    emoji: '🏢',
    title: 'Gewerbe',
    description: 'Mietvertrag für Büros, Läden und Gewerberäume',
    price: 'Ab 16€ bei Haus & Grund',
    features: ['Gewerbliche Nutzung', 'Umsatzsteuer-Option', 'Konkurrenzschutz'],
  },
  {
    id: 'garage' as const,
    emoji: '🚗',
    title: 'Garage / Stellplatz',
    description: 'Mietvertrag für Garagen und Stellplätze',
    price: 'Ab 10€ bei Haus & Grund',
    features: ['Separate Kündigung', 'Nutzungsregeln', 'Haftung'],
  },
]

export default function ContractTypeSelector({ onSelect }: Props) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Welchen Mietvertrag möchten Sie erstellen?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Wählen Sie die Art des Mietvertrags. Alle Verträge entsprechen den aktuellen 
          rechtlichen Anforderungen und können individuell angepasst werden.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {contractTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onSelect(type.id)}
            className="form-section text-left hover:border-primary hover:shadow-md 
                     transition-all duration-200 group cursor-pointer"
          >
            <div className="text-4xl mb-4">{type.emoji}</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 
                         group-hover:text-primary transition-colors">
              {type.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              {type.description}
            </p>
            <ul className="space-y-2 mb-4">
              {type.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="text-green-500">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500">{type.price}</p>
              <p className="text-xs text-primary font-medium mt-1">Bei uns: Kostenlos testen →</p>
            </div>
          </button>
        ))}
      </div>

      <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 text-center">
        <p className="text-sm text-indigo-800 dark:text-indigo-200">
          💡 <strong>Tipp:</strong> Unsere Verträge basieren auf aktueller Rechtsprechung (Stand 2026) 
          und werden regelmäßig aktualisiert.
        </p>
      </div>
    </div>
  )
}
