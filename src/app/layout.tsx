import type { Metadata } from 'next'
import './globals.css'
import ThemeToggle from '@/components/ThemeToggle'

export const metadata: Metadata = {
  title: 'Mietvertrag Generator | Mariplex',
  description: 'Erstellen Sie rechtssichere Mietverträge in wenigen Minuten. Für Wohnraum, Gewerbe und Garagen.',
  keywords: 'Mietvertrag, Generator, Vermieter, Wohnung, Gewerbe, PDF',
}

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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        {/* Header */}
        <header className="header">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
            <a href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl 
                            flex items-center justify-center shadow-lg shadow-cyan-500/30
                            group-hover:shadow-xl group-hover:shadow-cyan-500/40 
                            group-hover:scale-105 transition-all duration-200">
                <span className="text-xl">🏠</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white">
                  Mietvertrag Generator
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  by Mariplex
                </p>
              </div>
            </a>
            
            <nav className="flex items-center gap-3">
              <a 
                href="https://mariplex.de" 
                className="btn-ghost hidden sm:flex items-center gap-2 text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Mariplex
              </a>
              <ThemeToggle />
            </nav>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="border-t border-slate-200/50 dark:border-slate-700/50 mt-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg 
                              flex items-center justify-center">
                  <span className="text-sm">🏠</span>
                </div>
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                  Mariplex © 2026
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-500 text-center sm:text-right max-w-md">
                Hinweis: Dieser Generator ersetzt keine Rechtsberatung. 
                Bitte prüfen Sie die Verträge vor Verwendung.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
