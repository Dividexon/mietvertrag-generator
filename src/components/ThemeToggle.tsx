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
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (localStorage.getItem('theme') === 'system') applyTheme('system')
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const applyTheme = (t: Theme) => {
    const root = document.documentElement
    const isDark = t === 'dark' || (t === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    root.classList.toggle('dark', isDark)
    localStorage.setItem('theme', t)
  }

  const selectTheme = (t: Theme) => {
    setTheme(t)
    applyTheme(t)
    setIsOpen(false)
  }

  if (!mounted) return <div className="w-10 h-10" />

  const current = themeOptions.find(o => o.id === theme)!

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 
                   flex items-center justify-center text-lg
                   active:opacity-70 transition-opacity"
      >
        {current.icon}
      </button>

      {isOpen && (
        <div className="dropdown-menu absolute right-0 mt-2 w-40 py-1 
                        bg-white dark:bg-slate-800 
                        rounded-xl shadow-lg
                        border border-slate-200 dark:border-slate-700">
          {themeOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => selectTheme(option.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-left
                         ${theme === option.id 
                           ? 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20' 
                           : 'text-slate-700 dark:text-slate-300'}`}
            >
              <span>{option.icon}</span>
              <span className="text-sm font-medium">{option.label}</span>
              {theme === option.id && (
                <span className="ml-auto text-cyan-600 dark:text-cyan-400">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
