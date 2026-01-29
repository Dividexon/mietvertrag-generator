'use client'

import { useState, useEffect } from 'react'

type Theme = 'system' | 'light' | 'dark'

const themes: Theme[] = ['system', 'light', 'dark']

const themeIcons: Record<Theme, string> = {
  system: '💻',
  light: '☀️',
  dark: '🌙',
}

const themeLabels: Record<Theme, string> = {
  system: 'System',
  light: 'Hell',
  dark: 'Dunkel',
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('theme') as Theme | null
    if (stored && themes.includes(stored)) {
      setTheme(stored)
      applyTheme(stored)
    } else {
      applyTheme('system')
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system')
      }
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const applyTheme = (t: Theme) => {
    const root = document.documentElement
    
    if (t === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      root.classList.toggle('dark', isDark)
    } else {
      root.classList.toggle('dark', t === 'dark')
    }
    
    localStorage.setItem('theme', t)
  }

  const cycleTheme = () => {
    const currentIndex = themes.indexOf(theme)
    const nextTheme = themes[(currentIndex + 1) % themes.length]
    setTheme(nextTheme)
    applyTheme(nextTheme)
  }

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <button 
        className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 w-10 h-10"
        aria-label="Theme laden..."
      />
    )
  }

  return (
    <button
      onClick={cycleTheme}
      className="flex items-center gap-2 px-3 py-2 rounded-xl 
                 bg-slate-100 dark:bg-slate-800 
                 hover:bg-slate-200 dark:hover:bg-slate-700
                 border border-slate-200 dark:border-slate-700
                 transition-all duration-200"
      title={`Theme: ${themeLabels[theme]}`}
      aria-label={`Theme wechseln. Aktuell: ${themeLabels[theme]}`}
    >
      <span className="text-lg">{themeIcons[theme]}</span>
      <span className="text-sm font-medium text-slate-600 dark:text-slate-400 hidden sm:inline">
        {themeLabels[theme]}
      </span>
    </button>
  )
}
