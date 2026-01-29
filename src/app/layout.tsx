import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mietvertrag Generator | Mariplex',
  description: 'Erstellen Sie rechtssichere Mietverträge in wenigen Minuten. Für Wohnraum, Gewerbe und Garagen.',
  keywords: 'Mietvertrag, Generator, Vermieter, Wohnung, Gewerbe, PDF',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🏠</span>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Mietvertrag Generator</h1>
                <p className="text-xs text-gray-500">by Mariplex</p>
              </div>
            </div>
            <nav className="flex items-center gap-4">
              <a href="https://mariplex.de" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">
                ← Zurück zu Mariplex
              </a>
            </nav>
          </div>
        </header>
        <main className="max-w-5xl mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="border-t border-gray-200 dark:border-gray-700 mt-12">
          <div className="max-w-5xl mx-auto px-4 py-6 text-center text-sm text-gray-500">
            <p>© 2026 Mariplex. Alle Rechte vorbehalten.</p>
            <p className="mt-1 text-xs">
              Hinweis: Dieser Generator ersetzt keine Rechtsberatung. 
              Bitte prüfen Sie die Verträge vor Verwendung.
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
