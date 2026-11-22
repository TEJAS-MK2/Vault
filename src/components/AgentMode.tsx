import { useState } from 'react'

export function AgentMode() {
  const [open, setOpen] = useState(false)
  return <div className="agent-mode-wrap">
    <button type="button" className="agent-mode-trigger" aria-expanded={open} aria-controls="agent-mode-panel" onClick={() => setOpen((value) => !value)}>
      <span className="agent-mode-pulse" /> Agent mode <span aria-hidden="true">↗</span>
    </button>
    {open && <section className="agent-mode-panel" id="agent-mode-panel" aria-label="Agent-readable profile">
      <div className="agent-mode-heading"><span>PUBLIC PROFILE / READ ONLY</span><button type="button" onClick={() => setOpen(false)} aria-label="Close agent mode">×</button></div>
      <h2>Hi, I’m Pijush.</h2>
      <p>A student developer interested in systems, creative web experiences, networks and security.</p>
      <div className="agent-mode-links">
        <a href="/llms.txt">Read site guide <span>↗</span></a>
        <a href="/profile.json">Structured profile <span>↗</span></a>
        <a href="https://github.com/TEJAS-MK2" target="_blank" rel="noreferrer">Public GitHub <span>↗</span></a>
      </div>
      <small>This mode exposes public website information only. It does not provide private data or an interactive AI agent.</small>
    </section>}
  </div>
}
