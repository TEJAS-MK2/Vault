import { useEffect, useState } from 'react'
import { SiteShell } from './components/SiteShell'
import {
  AboutPage, ContactPage, ExperimentsPage, HomePage, NotFoundPage,
  WritingPage, UsesPage, NowPage,
} from './pages/Pages'
import './styles.css'
import './enhancements.css'
import './reference-style.css'

const knownRoutes = new Set(['/','/about','/experiments','/writing','/uses','/now','/contact'])

function readPath() {
  const path = window.location.pathname.replace(/\/+$/, '')
  return path || '/'
}

function pageMetadata(path: string) {
  const titles: Record<string, string> = {
    '/': 'Pijush Chakraborty — Student developer',
    '/about': 'About — PIJUSH',
    '/experiments': 'Experiments — PIJUSH',
    '/writing': 'Writing — PIJUSH',
    '/uses': 'Uses — PIJUSH',
    '/now': 'Now — PIJUSH',
    '/contact': 'Contact — PIJUSH',
  }
  const title = titles[path] ?? 'Page not found — PIJUSH'
  const description = path === '/'
    ? 'The personal website of Pijush Chakraborty, student developer and curious builder.'
    : 'Notes, experiments and personal interests from Pijush.'
  return { title, description, indexable: knownRoutes.has(path) }
}

export default function App() {
  const [path, setPath] = useState(readPath)

  useEffect(() => {
    const onPopState = () => setPath(readPath())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    const metadata = pageMetadata(path)
    document.title = metadata.title
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (description) description.content = metadata.description
    const robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]')
    if (robots) robots.content = metadata.indexable ? 'index,follow' : 'noindex,nofollow'
    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (canonical) canonical.href = window.location.origin + path
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [path])

  const navigate = (nextPath: string) => {
    const next = nextPath.startsWith('/') ? nextPath : `/${nextPath}`
    if (next === path) return
    window.history.pushState({}, '', next)
    setPath(next)
  }

  const page = (() => {
    if (path === '/') return <HomePage />
    if (path === '/about') return <AboutPage />
    if (path === '/experiments') return <ExperimentsPage />
    if (path === '/writing') return <WritingPage />
    if (path === '/uses') return <UsesPage />
    if (path === '/now') return <NowPage />
    if (path === '/contact') return <ContactPage />
    return <NotFoundPage />
  })()

  return <SiteShell navigate={navigate} pathname={path}>{page}</SiteShell>
}
