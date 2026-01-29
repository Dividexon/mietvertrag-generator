import type { Metadata } from 'next'
import './globals.css'
import ThemeToggle from '@/components/ThemeToggle'

export const metadata: Metadata = {
  title: 'Mietvertrag Generator | Mariplex',
  description: 'Erstellen Sie rechtssichere Mietverträge in wenigen Minuten.',
}

const themeScript = `
  (function() {
    const theme = localStorage.getItem('theme') || 'system';
    const isDark = theme === 'dark' || 
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) document.documentElement.classList.add('dark');
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
      <body className="min-h-screen bg-slate-50 dark:bg-slate-900">
        {/* Clean Header */}
        <header className="header">
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-lg font-semibold text-slate-900 dark:text-white">
              Mietvertrag Generator
            </h1>
            <ThemeToggle />
          </div>
        </header>
        
        {/* Content */}
        <main className="max-w-2xl mx-auto px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  )
}
