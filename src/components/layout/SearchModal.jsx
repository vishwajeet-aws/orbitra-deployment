import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { appNavItems } from '../../data/navigation.js'

function SearchModal({ open, onClose }) {
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const value = query.trim().toLowerCase()
    if (!value) return appNavItems
    return appNavItems.filter((item) => item.label.toLowerCase().includes(value))
  }, [query])

  useEffect(() => {
    if (!open) {
      setQuery('')
      return undefined
    }

    inputRef.current?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  const goTo = (path) => {
    navigate(path)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh]">
      <button
        type="button"
        aria-label="Close search"
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="orbitra-search-title"
        className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-orbitra-border bg-orbitra-850 shadow-2xl"
      >
        <h2 id="orbitra-search-title" className="sr-only">
          Search Orbitra pages
        </h2>
        <div className="flex items-center gap-3 border-b border-orbitra-border px-4">
          <Search size={16} className="text-orbitra-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search pages, projects, and tools"
            className="h-12 w-full bg-transparent text-sm text-orbitra-text outline-none placeholder:text-orbitra-muted"
          />
          <kbd className="hidden rounded border border-orbitra-border px-1.5 py-0.5 text-[10px] text-orbitra-muted sm:inline">
            ESC
          </kbd>
        </div>
        <ul className="max-h-80 overflow-y-auto p-2">
          {results.length === 0 ? (
            <li className="px-3 py-6 text-center text-sm text-orbitra-muted">
              No matching pages
            </li>
          ) : (
            results.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.path}>
                  <button
                    type="button"
                    onClick={() => goTo(item.path)}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-orbitra-text hover:bg-orbitra-800"
                  >
                    <Icon size={16} className="text-accent-cyan" />
                    {item.label}
                  </button>
                </li>
              )
            })
          )}
        </ul>
      </div>
    </div>
  )
}

export default SearchModal
