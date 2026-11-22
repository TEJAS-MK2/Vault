import type { MouseEvent, ReactNode } from 'react'

export type Navigate = (path: string) => void

const links = [
  { label: 'About', path: '/about' },
  { label: 'Lab', path: '/experiments' },
  { label: 'Notes', path: '/writing' },
]

export function SiteShell({ children, navigate, pathname }: { children: ReactNode; navigate: Navigate; pathname: string }) {
  const active = (path: string) => pathname === path
  const go = (event: MouseEvent<HTMLAnchorElement>, path: string) => {
    event.preventDefault()
    navigate(path)
  }

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <a className="wordmark" href="/" onClick={(event) => go(event, '/')} aria-label="P. PIJUSH home">
          <span className="wordmark-symbol">P.</span><span>PIJUSH</span>
        </a>
        <nav className="primary-nav" aria-label="Main navigation">
          {links.map((link) => (
            <a key={link.path} href={link.path} aria-current={active(link.path) ? 'page' : undefined} className={active(link.path) ? 'is-active' : ''} onClick={(event) => go(event, link.path)}>{link.label}</a>
          ))}
        </nav>
        <a className="header-contact" href="/contact" onClick={(event) => go(event, '/contact')}>Say hello <span aria-hidden="true">↗</span></a>
      </header>
      <main id="main-content" tabIndex={-1}>{children}</main>
      <footer className="site-footer">
        <span>© {new Date().getFullYear()} PIJUSH</span>
        <span>Made with curiosity. Built on the web.</span>
        <a href="https://github.com/TEJAS-MK2" target="_blank" rel="noreferrer">GitHub ↗</a>
      </footer>
    </div>
  )
}
