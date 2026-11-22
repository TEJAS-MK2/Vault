import { useEffect, useMemo, useRef, useState } from 'react'
import type { Navigate } from './SiteShell'

type Command = { label: string; detail: string; path?: string; href?: string }

const commands: Command[] = [
  { label: 'Home', detail: 'Back to the beginning', path: '/' },
  { label: 'About', detail: 'The person behind the site', path: '/about' },
  { label: 'Interests', detail: 'Topics and rabbit holes', path: '/experiments' },
  { label: 'Notes', detail: 'Writing and observations', path: '/writing' },
  { label: 'Uses', detail: 'Tools and setup', path: '/uses' },
  { label: 'Now', detail: 'Current focus', path: '/now' },
  { label: 'Contact', detail: 'Start a conversation', path: '/contact' },
  { label: 'GitHub', detail: 'Public repositories and activity', href: 'https://github.com/TEJAS-MK2' },
  { label: 'Agent profile', detail: 'Machine-readable site information', href: '/profile.json' },
]

export function CommandPalette({ navigate }: { navigate: Navigate }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const filtered = useMemo(() => commands.filter((item) => (item.label + ' ' + item.detail).toLowerCase().includes(query.toLowerCase())), [query])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((value) => !value)
      } else if (event.key === 'Escape') {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  const run = (item: Command) => {
    setOpen(false)
    if (item.path) navigate(item.path)
    if (item.href) window.location.assign(item.href)
  }

  return <>
    <button className="command-trigger" type="button" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-expanded={open}>
      <span aria-hidden="true">⌕</span><span>Quick find</span><kbd>⌘ K</kbd>
    </button>
    {open && <div className="command-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false) }}>
      <section className="command-dialog" role="dialog" aria-modal="true" aria-labelledby="command-title">
        <h2 id="command-title" className="sr-only">Quick navigation</h2>
        <div className="command-search"><span aria-hidden="true">⌕</span><input ref={inputRef} value={query} onChange={(event) => { setQuery(event.target.value); setActive(0) }} onKeyDown={(event) => {
          if (event.key === 'ArrowDown') { event.preventDefault(); setActive((value) => Math.min(value + 1, filtered.length - 1)) }
          if (event.key === 'ArrowUp') { event.preventDefault(); setActive((value) => Math.max(value - 1, 0)) }
          if (event.key === 'Enter' && filtered[active]) { event.preventDefault(); run(filtered[active]) }
        }} placeholder="Search pages and links…" aria-label="Search pages and links" /><kbd>ESC</kbd></div>
        <p className="command-hint">NAVIGATE / OPEN</p>
        <div className="command-results">
          {filtered.length ? filtered.map((item, index) => <button type="button" key={item.label} className={index === active ? 'command-item is-selected' : 'command-item'} onMouseEnter={() => setActive(index)} onClick={() => run(item)}><span><strong>{item.label}</strong><small>{item.detail}</small></span><span aria-hidden="true">↗</span></button>) : <p className="command-empty">No matching destinations.</p>}
        </div>
        <div className="command-footer"><span>↑ ↓ to move</span><span>↵ to open</span><span>ESC to close</span></div>
      </section>
    </div>}
  </>
}
