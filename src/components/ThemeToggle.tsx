'use client'

import { useState, useEffect, useRef } from 'react'

type Theme = 'system' | 'light' | 'dark'

const themeOptions: { id: Theme; icon: string; label: string }[] = [
  { id: 'system', icon: '💻', label: 'System' },
  { id: 'light', icon: '☀️', label: 'Hell' },
  { id: 'dark', icon: '🌙', label: 'Dunkel' },
]

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('system')
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('theme') as Theme | null
    if (stored && ['system', 'light', 'dark'].includes(stored)) {
      setTheme(stored)
      applyTheme(stored)
    } else {
      applyTheme('system')
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      const currentTheme = localStorage.getItem('theme') as Theme
      if (currentTheme === 'system') {
        applyTheme('system')
      }
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
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

  const selectTheme = (t: Theme) => {
    setTheme(t)
    applyTheme(t)
    setIsOpen(false)
  }

  const currentOption = themeOptions.find(o => o.id === theme) || themeOptions[0]

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 animate-pulse" />
    )
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl 
                   bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm
                   border border-slate-200 dark:border-slate-700
                   hover:bg-slate-50 dark:hover:bg-slate-700/80
                   shadow-sm hover:shadow
                   transition-all duration-200"
        aria-label="Theme auswählen"
        aria-expanded={isOpen}
      >
        <span className="text-lg">{currentOption.icon}</span>
        <svg 
          className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 py-2 
                        bg-white dark:bg-slate-800 
                        rounded-xl shadow-xl
                        border border-slate-200 dark:border-slate-700
                        animate-in fade-in slide-in-from-top-2 duration-200
                        z-50">
          <div className="px-3 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Theme
          </div>
          {themeOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => selectTheme(option.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5
                         hover:bg-slate-100 dark:hover:bg-slate-700/50
                         transition-colors duration-150
                         ${theme === option.id 
                           ? 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20' 
                           : 'text-slate-700 dark:text-slate-300'}`}
            >
              <span className="text-lg">{option.icon}</span>
              <span className="font-medium">{option.label}</span>
              {theme === option.id && (
                <svg className="w-4 h-4 ml-auto text-cyan-600 dark:text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
