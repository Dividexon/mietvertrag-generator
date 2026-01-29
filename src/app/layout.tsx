import type { Metadata } from 'next'
import './globals.css'
import ThemeToggle from '@/components/ThemeToggle'

export const metadata: Metadata = {
  title: 'Mietvertrag Generator | Mariplex',
  description: 'Erstellen Sie rechtssichere Mietverträge in wenigen Minuten. Für Wohnraum, Gewerbe und Garagen.',
  keywords: 'Mietvertrag, Generator, Vermieter, Wohnung, Gewerbe, PDF',
}

// Script to prevent flash of wrong theme
const themeScript = `
  (function() {
    const theme = localStorage.getItem('theme') || 'system';
    const isDark = theme === 'dark' || 
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  })();
`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50 transition-colors duration-300">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center">
                <span className="text-xl">🏠</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">Mietvertrag Generator</h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">by Mariplex</p>
              </div>
            </div>
            <nav className="flex items-center gap-4">
              <a 
                href="https://mariplex.de" 
                className="text-sm text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors hidden sm:block"
              >
                ← Zurück zu Mariplex
              </a>
              <ThemeToggle />
            </nav>
          </div>
        </header>
        
        <main className="max-w-5xl mx-auto px-4 py-8">
          {children}
        </main>
        
        <footer className="border-t border-slate-200 dark:border-slate-700 mt-12 transition-colors duration-300">
          <div className="max-w-5xl mx-auto px-4 py-6 text-center text-sm text-slate-500 dark:text-slate-400">
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
