import { useEffect, useMemo, useRef, useState } from 'react'
import type { DragEvent, FormEvent, ReactNode } from 'react'
import {
  Archive, ArrowDownToLine, ArrowLeft, ChevronRight, Clock3,
  Cloud, File, FileImage, FileText, Film, Folder, FolderPlus, Grid2X2,
  HardDrive, Home, Image, LayoutGrid, List, LoaderCircle, LockKeyhole,
  LogOut, Menu, MoreHorizontal, Music2, Plus, Search, ShieldCheck,
  Trash2, UploadCloud, X
} from 'lucide-react'
import { supabase, storageBucket, isConfigured } from './lib/supabase'
import './styles.css'

type Section = 'All files' | 'Recent' | 'Images' | 'Videos' | 'Documents' | 'Audio' | 'Archives'
type Entry = {
  name: string
  id?: string | null
  size?: number
  updated_at?: string | null
  created_at?: string | null
  metadata?: Record<string, unknown> | null
  folder: boolean
}
type AppProps = { navigate: (path: string) => void; url: (path: string) => string }

const sections: { name: Section; icon: typeof File }[] = [
  { name: 'All files', icon: LayoutGrid },
  { name: 'Recent', icon: Clock3 },
  { name: 'Images', icon: Image },
  { name: 'Videos', icon: Film },
  { name: 'Documents', icon: FileText },
  { name: 'Audio', icon: Music2 },
  { name: 'Archives', icon: Archive }
]

const extension = (name: string) => name.split('.').pop()?.toLowerCase() ?? ''
const fileKind = (name: string) => {
  const ext = extension(name)
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'heic', 'avif'].includes(ext)) return 'image'
  if (['mp4', 'mov', 'mkv', 'webm'].includes(ext)) return 'video'
  if (['mp3', 'wav', 'ogg', 'm4a', 'flac'].includes(ext)) return 'audio'
  if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) return 'archive'
  if (['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'md', 'csv'].includes(ext)) return 'document'
  return 'file'
}
const formatBytes = (bytes = 0) => {
  if (!Number.isFinite(bytes) || bytes <= 0) return '—'
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
  if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + ' MB'
  return (bytes / 1073741824).toFixed(2) + ' GB'
}
const safeSegment = (value: string) => {
  const clean = value.trim().replace(/\s+/g, ' ')
  if (!clean || clean === '.' || clean === '..' || clean.length > 120) return null
  if (clean.includes('/') || clean.includes('\\') || /[\u0000-\u001f\u007f]/.test(clean)) return null
  return clean
}
const fileIcon = (name: string) => {
  const kind = fileKind(name)
  if (kind === 'image') return <FileImage size={19} />
  if (kind === 'video') return <Film size={19} />
  if (kind === 'audio') return <Music2 size={19} />
  if (kind === 'archive') return <Archive size={19} />
  if (kind === 'document') return <FileText size={19} />
  return <File size={19} />
}

function Brand({ small = false }: { small?: boolean }) {
  return <span className="brand-lockup"><span className={'brand-mark' + (small ? ' brand-mark-small' : '')}>V</span><span className="brand-word">VAULT</span></span>
}

function PublicFooter({ navigate, url }: AppProps) {
  return <footer className="public-footer">
    <Brand small />
    <span>Private by design. Simple by nature.</span>
    <nav aria-label="Legal"><a href={url('/terms')} onClick={e => { e.preventDefault(); navigate('/terms') }}>Terms</a><a href={url('/privacy')} onClick={e => { e.preventDefault(); navigate('/privacy') }}>Privacy</a><a href="https://github.com/TEJAS-MK2/Vault" target="_blank" rel="noreferrer">GitHub ↗</a></nav>
  </footer>
}

function HomePage({ navigate, url }: AppProps) {
  return <div className="marketing-page">
    <header className="marketing-nav">
      <a className="brand-anchor" href={url('/')} onClick={e => { e.preventDefault(); navigate('/') }} aria-label="VAULT home"><Brand /></a>
      <nav className="marketing-links" aria-label="Main navigation">
        <a href="#features">Why VAULT</a>
        <a href="#privacy">Privacy</a>
      </nav>
      <div className="marketing-actions">
        <a className="nav-login" href={url('/app')} onClick={e => { e.preventDefault(); navigate('/app') }}>Sign in</a>
        <a className="button button-dark button-small" href={url('/app')} onClick={e => { e.preventDefault(); navigate('/app') }}>Open VAULT <ArrowDownToLine size={15} /></a>
      </div>
    </header>

    <main>
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> YOUR SPACE, IN THE CLOUD</p>
          <h1>A little more room for <em>everything.</em></h1>
          <p className="hero-description">One considered place for your files, photographs, documents and the things you don't want to lose in the noise.</p>
          <div className="hero-actions">
            <a className="button button-dark" href={url('/app')} onClick={e => { e.preventDefault(); navigate('/app') }}>Enter your VAULT <ArrowDownToLine size={16} /></a>
            <a className="quiet-link" href="#features">Explore the workspace <ChevronRight size={15} /></a>
          </div>
          <div className="hero-proof"><span><LockKeyhole size={14} /> Private cloud storage</span><i /> <span><ShieldCheck size={14} /> Access scoped to your account</span></div>
        </div>
        <div className="hero-visual" aria-label="Illustration of the VAULT file workspace">
          <div className="visual-window">
            <div className="visual-topline"><span className="window-dots"><i /><i /><i /></span><span>VAULT / My files</span><span className="visual-lock"><LockKeyhole size={12} /> Private</span></div>
            <div className="visual-body">
              <aside className="visual-sidebar"><div className="visual-logo"><span>V</span> VAULT</div><div className="visual-nav active"><LayoutGrid size={13} /> My files</div><div className="visual-nav"><Clock3 size={13} /> Recent</div><div className="visual-nav"><Image size={13} /> Photos</div><div className="visual-nav"><FileText size={13} /> Documents</div><div className="visual-storage"><span>Cloud storage</span><b><span /></b><small>Your files, kept together</small></div></aside>
              <div className="visual-files"><div className="visual-heading"><div><small>YOUR WORKSPACE</small><b>My files</b></div><span className="visual-upload"><Plus size={12} /> Upload</span></div><div className="visual-search"><Search size={12} /> Search your files <kbd>⌘ K</kbd></div><div className="visual-crumb">Workspace <ChevronRight size={10} /> My files</div><div className="visual-folders"><div><span className="folder-art"><Folder size={20} /></span><b>Projects</b><small>Folder</small></div><div><span className="folder-art warm"><Folder size={20} /></span><b>Personal</b><small>Folder</small></div></div><div className="visual-file-row"><span className="art-file pdf">PDF</span><b>Project-brief.pdf</b><small>2.4 MB</small><span>Today</span></div><div className="visual-file-row"><span className="art-file image">IMG</span><b>Summer-notes.jpg</b><small>4.8 MB</small><span>Yesterday</span></div><div className="visual-file-row"><span className="art-file text">TXT</span><b>Reading-list.txt</b><small>12 KB</small><span>Nov 18</span></div></div>
            </div>
          </div>
          <div className="visual-caption"><span className="caption-line" /> A quieter home for your digital life</div>
        </div>
      </section>

      <section className="trust-strip" id="privacy">
        <div><ShieldCheck size={17} /><span>Private storage by default</span></div>
        <div><Cloud size={17} /><span>Files live in the cloud</span></div>
        <div><LockKeyhole size={17} /><span>Access stays account-scoped</span></div>
      </section>

      <section className="features-section" id="features">
        <div className="section-intro"><p className="eyebrow">MADE TO STAY OUT OF YOUR WAY</p><h2>Less hunting.<br /><em>More finding.</em></h2><p>Your storage should be the quiet part of your day. VAULT keeps the essentials close and the interface out of the way.</p></div>
        <div className="feature-grid">
          <article className="feature-card feature-large"><span className="feature-icon"><Folder size={19} /></span><p className="eyebrow">A PLACE FOR EACH THING</p><h3>Keep a clear view of what you keep.</h3><p>Browse folders, move through a familiar path, and switch between a visual grid and a detailed list.</p><div className="feature-folder-stack"><span><Folder size={17} /> Projects <small>Folder</small></span><span><Folder size={17} /> Personal <small>Folder</small></span><span><Folder size={17} /> Archive <small>Folder</small></span></div></article>
          <article className="feature-card"><span className="feature-icon"><Search size={19} /></span><p className="eyebrow">FIND IT AGAIN</p><h3>Search that stays close.</h3><p>Find a file by name in the folder you're viewing, without losing your place.</p></article>
          <article className="feature-card"><span className="feature-icon"><Cloud size={19} /></span><p className="eyebrow">CLOUD, NOT CLUTTER</p><h3>Your files travel with your account.</h3><p>Content is stored in private cloud storage and loaded when you sign in.</p></article>
        </div>
      </section>

      <section className="closing-section">
        <div><p className="eyebrow">READY WHEN YOU ARE</p><h2>Make room for what matters.</h2><p>Your space is waiting. Sign in to start adding the things you want to keep.</p></div>
        <a className="button button-light" href={url('/app')} onClick={e => { e.preventDefault(); navigate('/app') }}>Open your VAULT <ArrowDownToLine size={16} /></a>
      </section>
    </main>
    <PublicFooter navigate={navigate} url={url} />
  </div>
}

function LegalLayout({ title, intro, children, navigate, url }: AppProps & { title: string; intro: string; children: ReactNode }) {
  return <div className="legal-page">
    <header className="marketing-nav legal-nav">
      <a className="brand-anchor" href={url('/')} onClick={e => { e.preventDefault(); navigate('/') }} aria-label="VAULT home"><Brand /></a>
      <a className="button button-outline button-small" href={url('/app')} onClick={e => { e.preventDefault(); navigate('/app') }}>Open VAULT <ChevronRight size={15} /></a>
    </header>
    <main className="legal-main">
      <a className="back-link" href={url('/')} onClick={e => { e.preventDefault(); navigate('/') }}><ArrowLeft size={15} /> Back to home</a>
      <p className="eyebrow">VAULT · LEGAL</p>
      <h1>{title}</h1>
      <p className="legal-intro">{intro}</p>
      <p className="last-updated">Last updated: 21 November 2026</p>
      <div className="legal-content">{children}</div>
    </main>
    <PublicFooter navigate={navigate} url={url} />
  </div>
}

function TermsPage(props: AppProps) {
  return <LegalLayout {...props} title="Terms and conditions" intro="The simple ground rules for using VAULT. Please read them before storing anything in your account.">
    <section><h2>1. About VAULT</h2><p>VAULT is a personal cloud-storage project that lets signed-in users upload and manage digital files. These terms apply to your use of the VAULT website and its storage features.</p></section>
    <section><h2>2. Your account</h2><p>You are responsible for the email address you use to sign in and for keeping access to that inbox secure. Sign-in links are intended for you only. Do not forward them or let another person use your session.</p></section>
    <section><h2>3. Your files and responsibilities</h2><p>You retain responsibility for the files you upload and for making sure you have the rights and permissions needed to store them. Do not upload unlawful, harmful, infringing, malicious or abusive material, and do not attempt to interfere with the service or bypass access controls.</p><p>Keep an independent copy of important files. VAULT is not a substitute for a separate backup or archival system.</p></section>
    <section><h2>4. Storage and availability</h2><p>Files are stored in a private cloud-storage bucket provided by Supabase. Access is designed to be restricted to the authenticated account that owns the file. The service may be unavailable or interrupted for maintenance, provider outages, security work or circumstances outside the maintainer's control.</p><p>Storage limits, file-size limits and provider terms may apply. The interface will display errors when a cloud operation cannot be completed; an upload is not complete until VAULT confirms it has succeeded.</p></section>
    <section><h2>5. Deletion and account closure</h2><p>You may delete files through the workspace. A deletion from cloud storage may be permanent. The current interface does not yet provide a self-service account-deletion control. Account-deletion requests can be raised through the project repository; do not include passwords, sign-in links or private file contents in a public post.</p></section>
    <section><h2>6. Acceptable use and security</h2><p>You must not use VAULT to distribute malware, conduct unlawful activity, test security controls without permission, scrape or overload the service, or access another person's data. We may restrict access when needed to protect users, the service or its infrastructure.</p></section>
    <section><h2>7. Third-party services</h2><p>VAULT depends on third-party infrastructure, including GitHub Pages for hosting and Supabase for authentication and cloud storage. Their services are subject to their own terms, policies and availability. VAULT does not control those providers.</p></section>
    <section><h2>8. No warranty</h2><p>VAULT is provided on an “as available” basis, without a promise that it will always be uninterrupted, error-free or suitable for a particular purpose. To the extent permitted by applicable law, the project maintainer disclaims implied warranties.</p></section>
    <section><h2>9. Changes to these terms</h2><p>These terms may be revised as the service changes. The “Last updated” date above identifies the latest published version. Continued use after a revision means you accept the revised terms.</p></section>
    <section><h2>10. Contact</h2><p>For questions about these terms, use the project repository at <a href="https://github.com/TEJAS-MK2/Vault" target="_blank" rel="noreferrer">github.com/TEJAS-MK2/Vault</a>. Do not post sensitive account details or private files in public issues.</p></section>
  </LegalLayout>
}

function PrivacyPage(props: AppProps) {
  return <LegalLayout {...props} title="Privacy policy" intro="What VAULT handles, where your content is stored, and the choices available to you.">
    <section><h2>1. Information VAULT handles</h2><p><strong>Account information:</strong> your email address and authentication/session information needed to sign you in.</p><p><strong>Stored content:</strong> files you choose to upload, along with object names, sizes, content-type metadata and timestamps required to list and manage them.</p><p><strong>Technical information:</strong> the hosting and infrastructure providers may process standard request, device and diagnostic information to deliver and secure their services.</p></section>
    <section><h2>2. How information is used</h2><p>Information is used to authenticate your account, store and retrieve your files, show file details, respond to support requests, protect the service and investigate operational or security issues. VAULT does not currently display ads or run product analytics, and the current build does not load third-party font or analytics scripts.</p></section>
    <section><h2>3. Where content is stored</h2><p>VAULT uses Supabase for authentication and cloud storage. The VAULT Supabase project is configured in the Mumbai region (India, <code>ap-south-1</code>) and uses a private storage bucket. Storage policies restrict object access to the authenticated user's own account folder.</p><p>GitHub Pages hosts the website. Your file content is sent to Supabase when you upload it; it is not stored as a file in the website's GitHub repository.</p></section>
    <section><h2>4. Sharing and disclosure</h2><p>VAULT does not currently provide public file-sharing links. Content is not intentionally made public by the application. Infrastructure providers process data as needed to deliver their services and under their own terms. Information may also be disclosed when required by law or when reasonably necessary to protect the service, its users or others.</p></section>
    <section><h2>5. Browser storage and cookies</h2><p>The Supabase client maintains authentication state in the browser so you can remain signed in. This session information is not a backup of your files. VAULT does not use advertising cookies or third-party analytics cookies in the current build.</p></section>
    <section><h2>6. Retention and deletion</h2><p>Files remain in cloud storage until you delete them or the account is removed. File deletion is intended to remove the object from the private bucket. Some infrastructure logs or backups may persist for a limited period under the provider's retention practices. The current interface does not include self-service account deletion; you can contact the maintainer through the project repository to request it.</p></section>
    <section><h2>7. Security</h2><p>The project uses a private storage bucket, authenticated access and row-level storage policies scoped to each user's account folder. Browser code uses a publishable Supabase key; privileged service-role keys are not included in the website. No online service can promise absolute security, so keep your sign-in inbox secure and retain separate backups of important content.</p></section>
    <section><h2>8. Your choices</h2><p>You can choose what to upload, download copies of your files, and delete files from your workspace. To request account deletion or ask a privacy question, use the project repository at <a href="https://github.com/TEJAS-MK2/Vault" target="_blank" rel="noreferrer">github.com/TEJAS-MK2/Vault</a>. Do not include passwords, one-time links, private files or other sensitive personal information in a public issue.</p></section>
    <section><h2>9. Children and age requirements</h2><p>VAULT is not designed to knowingly collect information from children who are not permitted to use the service under applicable law. If you believe a child has provided account information, contact the maintainer through the project repository.</p></section>
    <section><h2>10. Policy updates</h2><p>This policy may change when product features, infrastructure or legal requirements change. Material revisions will be reflected here with an updated date.</p></section>
  </LegalLayout>
}

function NotFoundPage({ navigate, url }: AppProps) {
  return <div className="not-found-page">
    <header className="marketing-nav"><a className="brand-anchor" href={url('/')} onClick={e => { e.preventDefault(); navigate('/') }}><Brand /></a><a className="button button-outline button-small" href={url('/app')} onClick={e => { e.preventDefault(); navigate('/app') }}>Open VAULT <ChevronRight size={15} /></a></header>
    <main><span className="not-found-number">404</span><p className="eyebrow">THIS PATH DOESN'T EXIST</p><h1>Nothing to see <em>here.</em></h1><p>The page may have moved, or the address may be incorrect. Your files are not affected.</p><a className="button button-dark" href={url('/')} onClick={e => { e.preventDefault(); navigate('/') }}><Home size={16} /> Back to home</a></main>
    <PublicFooter navigate={navigate} url={url} />
  </div>
}

function SignInPage({ navigate, url }: AppProps) {
  const [email, setEmail] = useState('')
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState('')
  const sendLink = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!supabase) return
    setBusy(true)
    setNotice('')
    const address = email.trim()
    const { error } = await supabase.auth.signInWithOtp({
      email: address,
      options: { emailRedirectTo: window.location.origin + url('/app') }
    })
    setNotice(error ? error.message : 'Check your inbox for your secure sign-in link.')
    setBusy(false)
  }
  return <main className="auth-screen">
    <a className="auth-back" href={url('/')} onClick={e => { e.preventDefault(); navigate('/') }}><ArrowLeft size={15} /> Back to VAULT</a>
    <form className="auth-card" onSubmit={sendLink}>
      <Brand />
      <p className="eyebrow">YOUR PRIVATE WORKSPACE</p>
      <h1>Good to have<br /><em>you here.</em></h1>
      <p className="auth-copy">Enter your email and we'll send a one-time sign-in link. No password to remember.</p>
      <label htmlFor="vault-email">Email address</label>
      <input id="vault-email" type="email" autoComplete="email" required maxLength={254} value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
      <button className="button button-dark auth-submit" type="submit" disabled={busy}>{busy ? <LoaderCircle className="spin" size={16} /> : null} Send sign-in link <ArrowDownToLine size={15} /></button>
      {notice && <p className="auth-notice" role="status">{notice}</p>}
      <p className="auth-legal">By continuing, you agree to the <a href={url('/terms')} onClick={e => { e.preventDefault(); navigate('/terms') }}>Terms</a> and <a href={url('/privacy')} onClick={e => { e.preventDefault(); navigate('/privacy') }}>Privacy Policy</a>.</p>
    </form>
    <p className="auth-footnote"><LockKeyhole size={13} /> Files are stored in private cloud storage.</p>
  </main>
}

function Workspace({ navigate, url }: AppProps) {
  const [userId, setUserId] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState('')
  const [authReady, setAuthReady] = useState(false)
  const [items, setItems] = useState<Entry[]>([])
  const [section, setSection] = useState<Section>('All files')
  const [folderPath, setFolderPath] = useState('')
  const [query, setQuery] = useState('')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [busy, setBusy] = useState(false)
  const [uploading, setUploading] = useState<string[]>([])
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState('')
  const [mobileNav, setMobileNav] = useState(false)
  const filePicker = useRef<HTMLInputElement>(null)
  const searchInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!supabase) { setAuthReady(true); return }
    let mounted = true
    void supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return
      setUserId(data.user?.id ?? null)
      setUserEmail(data.user?.email ?? '')
      setAuthReady(true)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return
      setUserId(session?.user.id ?? null)
      setUserEmail(session?.user.email ?? '')
      if (!session) {
        setItems([])
        setFolderPath('')
      }
      setAuthReady(true)
    })
    return () => { mounted = false; listener.subscription.unsubscribe() }
  }, [])

  const refresh = async () => {
    if (!supabase || !userId) return
    setBusy(true)
    setError('')
    const prefix = userId + (folderPath ? '/' + folderPath : '')
    const { data, error: listError } = await supabase.storage.from(storageBucket).list(prefix, {
      limit: 100,
      sortBy: { column: 'updated_at', order: 'desc' }
    })
    if (listError) {
      setError('Your files could not be loaded. ' + listError.message)
      setItems([])
    } else {
      const next = (data ?? [])
        .filter(item => item.name !== '.emptyFolderPlaceholder')
        .filter(item => safeSegment(item.name) !== null)
        .map(item => ({
          name: item.name,
          id: item.id,
          size: Number(item.metadata?.size ?? 0),
          updated_at: item.updated_at,
          created_at: item.created_at,
          metadata: item.metadata as Record<string, unknown> | null,
          folder: item.id == null && item.metadata == null
        }))
      next.sort((a, b) => Number(b.folder) - Number(a.folder) || (new Date(b.updated_at ?? b.created_at ?? 0).getTime() - new Date(a.updated_at ?? a.created_at ?? 0).getTime()))
      setItems(next)
    }
    setBusy(false)
  }

  useEffect(() => { if (userId) void refresh() }, [userId, folderPath])

  useEffect(() => {
    const handleKeys = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        searchInput.current?.focus()
      }
      if (event.key === 'Escape') {
        setMobileNav(false)
        setDragging(false)
      }
    }
    window.addEventListener('keydown', handleKeys)
    return () => window.removeEventListener('keydown', handleKeys)
  }, [])

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return items.filter(item => {
      const matches = !needle || item.name.toLowerCase().includes(needle)
      if (!matches) return false
      if (item.folder) return section === 'All files'
      const kind = fileKind(item.name)
      if (section === 'Images') return kind === 'image'
      if (section === 'Videos') return kind === 'video'
      if (section === 'Documents') return kind === 'document'
      if (section === 'Audio') return kind === 'audio'
      if (section === 'Archives') return kind === 'archive'
      return true
    })
  }, [items, query, section])

  const rootPath = userId ? userId + (folderPath ? '/' + folderPath : '') : ''
  const pathSegments = folderPath ? folderPath.split('/') : []
  const usedBytes = items.reduce((total, item) => total + (item.folder ? 0 : Number(item.size ?? 0)), 0)
  const currentHeading = pathSegments.length ? pathSegments[pathSegments.length - 1] : 'My files'

  const reportError = (message: string) => setError(message)

  const uploadFiles = async (selected: FileList | File[]) => {
    if (!supabase || !userId) { reportError('Sign in before uploading to your private workspace.'); return }
    const files = Array.from(selected)
    if (!files.length) return
    const prefix = rootPath + '/'
    for (const file of files) {
      const name = safeSegment(file.name)
      if (!name) { reportError('A file name contains characters that cannot be used in a cloud path.'); continue }
      setUploading(current => [...current, name])
      const { error: uploadError } = await supabase.storage.from(storageBucket).upload(prefix + name, file, {
        upsert: false,
        contentType: file.type || 'application/octet-stream'
      })
      if (uploadError) reportError(name + ': ' + uploadError.message)
      setUploading(current => current.filter(value => value !== name))
    }
    await refresh()
  }

  const createFolder = async () => {
    if (!supabase || !userId) return
    const entered = window.prompt('Name this folder')
    if (entered === null) return
    const name = safeSegment(entered)
    if (!name) { reportError('Use a folder name without slashes or control characters.'); return }
    setBusy(true)
    const { error: createError } = await supabase.storage.from(storageBucket).upload(rootPath + '/' + name + '/.emptyFolderPlaceholder', new Blob(['']), {
      upsert: false,
      contentType: 'text/plain'
    })
    if (createError) reportError(createError.message)
    await refresh()
  }

  const downloadFile = async (entry: Entry) => {
    if (!supabase) return
    const { data, error: downloadError } = await supabase.storage.from(storageBucket).download(rootPath + '/' + entry.name)
    if (downloadError || !data) { reportError(downloadError?.message ?? 'Download could not be started.'); return }
    const objectUrl = URL.createObjectURL(data)
    const anchor = document.createElement('a')
    anchor.href = objectUrl
    anchor.download = entry.name
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 5000)
  }

  const renameFile = async (entry: Entry) => {
    if (!supabase || entry.folder) return
    const entered = window.prompt('Rename file', entry.name)
    if (entered === null) return
    const name = safeSegment(entered)
    if (!name) { reportError('Use a file name without slashes or control characters.'); return }
    if (name === entry.name) return
    const { error: moveError } = await supabase.storage.from(storageBucket).move(rootPath + '/' + entry.name, rootPath + '/' + name)
    if (moveError) reportError(moveError.message)
    else await refresh()
  }

  const collectFolderFiles = async (prefix: string): Promise<string[]> => {
    if (!supabase) return []
    const found: string[] = []
    const walk = async (path: string): Promise<void> => {
      const { data, error: folderError } = await supabase!.storage.from(storageBucket).list(path, { limit: 100 })
      if (folderError) throw folderError
      for (const child of data ?? []) {
        const childPath = path + '/' + child.name
        if (child.id == null && child.metadata == null) await walk(childPath)
        else found.push(childPath)
      }
    }
    await walk(prefix)
    return found
  }

  const deleteEntry = async (entry: Entry) => {
    if (!supabase || !userId) return
    const label = entry.folder ? 'folder and everything inside it' : 'file'
    if (!window.confirm('Delete this ' + label + '? This removes it from cloud storage.')) return
    try {
      const paths = entry.folder
        ? await collectFolderFiles(rootPath + '/' + entry.name)
        : [rootPath + '/' + entry.name]
      for (let index = 0; index < paths.length; index += 100) {
        const { error: removeError } = await supabase.storage.from(storageBucket).remove(paths.slice(index, index + 100))
        if (removeError) throw removeError
      }
      await refresh()
    } catch (cause) {
      reportError(cause instanceof Error ? cause.message : 'The item could not be deleted.')
    }
  }

  const openFolder = (entry: Entry) => {
    if (!entry.folder) return
    setSection('All files')
    setFolderPath(folderPath ? folderPath + '/' + entry.name : entry.name)
    setQuery('')
  }

  const signOut = async () => {
    if (!supabase) return
    const { error: signOutError } = await supabase.auth.signOut()
    if (signOutError) reportError(signOutError.message)
  }

  if (!isConfigured || !supabase) return <main className="auth-screen"><div className="auth-card"><Brand /><p className="eyebrow">CONNECTION REQUIRED</p><h1>Connect your<br /><em>cloud space.</em></h1><p className="auth-copy">VAULT needs its Supabase project URL and publishable key to access private cloud storage. Add the VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY environment variables, then rebuild.</p><a className="button button-dark auth-submit" href="https://github.com/TEJAS-MK2/Vault/blob/main/supabase/SETUP.md" target="_blank" rel="noreferrer">Read setup guide <ArrowDownToLine size={15} /></a></div></main>
  if (!authReady) return <main className="auth-screen"><div className="auth-card"><Brand /><LoaderCircle className="spin auth-loader" size={22} /><p className="auth-copy">Checking your secure session…</p></div></main>
  if (!userId) return <SignInPage navigate={navigate} url={url} />

  return <div className="workspace-shell" onDragOver={event => { event.preventDefault(); setDragging(true) }} onDragLeave={event => { if (event.currentTarget === event.target) setDragging(false) }} onDrop={(event: DragEvent<HTMLDivElement>) => { event.preventDefault(); setDragging(false); void uploadFiles(event.dataTransfer.files) }}>
    {dragging && <div className="drop-overlay"><UploadCloud size={34} /><strong>Drop files to add to VAULT</strong><span>They will upload to your private cloud workspace.</span></div>}
    <aside className={'workspace-sidebar' + (mobileNav ? ' is-open' : '')}>
      <a className="brand-anchor workspace-brand" href={url('/')} onClick={event => { event.preventDefault(); navigate('/') }}><Brand /></a>
      <button className="button button-dark sidebar-upload" type="button" onClick={() => filePicker.current?.click()}><Plus size={16} /> Upload files</button>
      <input ref={filePicker} type="file" hidden multiple onChange={event => { if (event.target.files) void uploadFiles(event.target.files); event.target.value = '' }} />
      <p className="sidebar-label">YOUR SPACE</p>
      <nav className="workspace-nav" aria-label="Workspace sections">
        {sections.map(item => {
          const Icon = item.icon
          return <button type="button" key={item.name} className={'workspace-nav-item' + (section === item.name ? ' active' : '')} onClick={() => { setSection(item.name); setFolderPath(''); setQuery(''); setMobileNav(false) }}>
            <Icon size={17} /><span>{item.name}</span>{item.name === 'All files' && <small>{items.filter(value => !value.folder).length}</small>}
          </button>
        })}
      </nav>
      <div className="sidebar-bottom">
        <div className="storage-summary"><div><HardDrive size={15} /><span>In this folder</span></div><strong>{formatBytes(usedBytes)}</strong><p>File sizes loaded from cloud metadata</p></div>
        <div className="account-row"><span className="account-avatar">{(userEmail[0] ?? 'V').toUpperCase()}</span><span className="account-copy"><b>{userEmail.split('@')[0] || 'Your account'}</b><small>{userEmail}</small></span><button className="icon-button" type="button" onClick={signOut} aria-label="Sign out" title="Sign out"><LogOut size={16} /></button></div>
      </div>
    </aside>
    {mobileNav && <button className="mobile-scrim" aria-label="Close navigation" onClick={() => setMobileNav(false)} />}
    <main className="workspace-main">
      <header className="workspace-topbar">
        <button className="icon-button mobile-menu" type="button" onClick={() => setMobileNav(true)} aria-label="Open navigation"><Menu size={19} /></button>
        <div className="breadcrumbs" aria-label="Breadcrumb">
          <a href={url('/app')} onClick={event => { event.preventDefault(); setFolderPath(''); setSection('All files'); setQuery('') }}>Workspace</a>
          <ChevronRight size={13} />
          {pathSegments.length === 0
            ? <strong>{section === 'All files' ? 'My files' : section}</strong>
            : <>
              <a href={url('/app')} onClick={event => { event.preventDefault(); setFolderPath(''); setSection('All files') }}>My files</a>
              {pathSegments.map((segment, index) => <span className="crumb-part" key={index}><ChevronRight size={13} />{index === pathSegments.length - 1 ? <strong>{segment}</strong> : <a href={url('/app')} onClick={event => { event.preventDefault(); setFolderPath(pathSegments.slice(0, index + 1).join('/')); setSection('All files') }}>{segment}</a>}</span>)}
            </>}
        </div>
        <div className="topbar-right"><label className="workspace-search"><Search size={16} /><input ref={searchInput} aria-label="Search files in this folder" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search this folder" /><kbd>⌘ K</kbd></label><span className="secure-indicator"><LockKeyhole size={14} /> Private</span><button className="icon-button top-signout" title="Sign out" aria-label="Sign out" onClick={signOut}><LogOut size={17} /></button></div>
      </header>
      <section className="workspace-content">
        <div className="workspace-heading">
          <div><p className="eyebrow">YOUR PRIVATE WORKSPACE</p><h1>{pathSegments.length ? currentHeading : section}</h1><p>Keep the things you need, and find them when you need them.</p></div>
          <div className="heading-actions"><button className="button button-outline" type="button" onClick={() => void createFolder()}><FolderPlus size={16} /> New folder</button><button className="button button-dark" type="button" onClick={() => filePicker.current?.click()}><UploadCloud size={16} /> Upload</button></div>
        </div>
        <div className="content-toolbar">
          <div className="item-count"><strong>{visible.length}</strong> {visible.length === 1 ? 'item' : 'items'} {query && <span>matching “{query}”</span>}</div>
          <div className="toolbar-right"><button className={'view-toggle' + (view === 'grid' ? ' selected' : '')} type="button" aria-label="Grid view" aria-pressed={view === 'grid'} onClick={() => setView('grid')}><Grid2X2 size={16} /></button><button className={'view-toggle' + (view === 'list' ? ' selected' : '')} type="button" aria-label="List view" aria-pressed={view === 'list'} onClick={() => setView('list')}><List size={17} /></button></div>
        </div>

        {error && <div className="inline-alert" role="alert"><span>{error}</span><button type="button" onClick={() => setError('')} aria-label="Dismiss message"><X size={15} /></button></div>}
        {busy ? <div className="workspace-loading"><LoaderCircle className="spin" size={22} /><span>Loading your files…</span></div> :
          visible.length === 0 ? <div className="workspace-empty"><span className="empty-symbol">{query ? <Search size={23} /> : <Cloud size={25} />}</span><h2>{query ? 'No files found' : section === 'All files' ? 'This space is ready.' : 'Nothing here yet.'}</h2><p>{query ? 'Try a different name or clear your search.' : 'Upload a file or create a folder to give this space a start.'}</p><div className="empty-actions">{query ? <button className="button button-outline" type="button" onClick={() => setQuery('')}>Clear search</button> : <><button className="button button-outline" type="button" onClick={() => void createFolder()}><FolderPlus size={15} /> New folder</button><button className="button button-dark" type="button" onClick={() => filePicker.current?.click()}><UploadCloud size={15} /> Upload files</button></>}</div></div> :
          <div className={view === 'grid' ? 'entry-grid' : 'entry-list'}>
            {visible.map(entry => <article className={'entry-card' + (entry.folder ? ' is-folder' : '')} key={entry.name}>
              <button className="entry-open" type="button" onClick={() => entry.folder ? openFolder(entry) : void downloadFile(entry)} aria-label={entry.folder ? 'Open folder ' + entry.name : 'Download ' + entry.name}>
                <span className={'entry-icon ' + (entry.folder ? 'folder-icon' : fileKind(entry.name))}>{entry.folder ? <Folder size={21} /> : fileIcon(entry.name)}</span>
                <span className="entry-text"><b title={entry.name}>{entry.name}</b><small>{entry.folder ? 'Folder' : formatBytes(Number(entry.size ?? 0))}</small></span>
              </button>
              <div className="entry-meta">{entry.folder ? '—' : entry.updated_at ? new Date(entry.updated_at).toLocaleDateString() : 'Cloud file'}</div>
              <div className="entry-actions">
                {!entry.folder && <button type="button" className="icon-button" onClick={() => void downloadFile(entry)} aria-label={'Download ' + entry.name} title="Download"><ArrowDownToLine size={16} /></button>}
                {!entry.folder && <button type="button" className="icon-button" onClick={() => void renameFile(entry)} aria-label={'Rename ' + entry.name} title="Rename"><MoreHorizontal size={17} /></button>}
                <button type="button" className="icon-button danger-icon" onClick={() => void deleteEntry(entry)} aria-label={'Delete ' + entry.name} title="Delete"><Trash2 size={15} /></button>
              </div>
            </article>)}
          </div>
        }
        {uploading.length > 0 && <div className="upload-queue"><div className="queue-heading"><span><LoaderCircle className="spin" size={15} /> Uploading {uploading.length} {uploading.length === 1 ? 'file' : 'files'}</span><span>Keep this tab open</span></div>{uploading.map(name => <div className="queue-item" key={name}><File size={14} /><span>{name}</span><small>Sending to cloud…</small></div>)}</div>}
      </section>
      <footer className="workspace-footer"><span><ShieldCheck size={14} /> Your files are stored in a private bucket</span><span>VAULT · Personal cloud storage</span><div><a href={url('/terms')} onClick={event => { event.preventDefault(); navigate('/terms') }}>Terms</a><a href={url('/privacy')} onClick={event => { event.preventDefault(); navigate('/privacy') }}>Privacy</a></div></footer>
    </main>
  </div>
}

export default function App() {
  const base = import.meta.env.BASE_URL
  const baseRoot = base.endsWith('/') ? base.slice(0, -1) : base
  const readRoute = () => {
    const pathname = window.location.pathname
    const relative = pathname.startsWith(baseRoot) ? pathname.slice(baseRoot.length) : pathname
    const cleaned = relative.replace(/\/+$/, '')
    return cleaned || '/'
  }
  const [route, setRoute] = useState(readRoute)
  useEffect(() => {
    const titles: Record<string, string> = {
      '/': 'VAULT — A little more room for everything',
      '/app': 'My files — VAULT',
      '/terms': 'Terms and conditions — VAULT',
      '/privacy': 'Privacy policy — VAULT'
    }
    document.title = titles[route] ?? 'Page not found — VAULT'
    const robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]')
    if (robots) robots.content = route === '/app' || !titles[route] ? 'noindex,nofollow' : 'index,follow'
  }, [route])
  useEffect(() => {
    const onPopState = () => setRoute(readRoute())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])
  const url = (path: string) => base + path.replace(/^\/+/, '')
  const navigate = (path: string) => {
    const next = path.startsWith('/') ? path : '/' + path
    window.history.pushState({}, '', url(next))
    setRoute(next)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }
  const props = { navigate, url }
  if (route === '/') return <HomePage {...props} />
  if (route === '/terms') return <TermsPage {...props} />
  if (route === '/privacy') return <PrivacyPage {...props} />
  if (route === '/app') return <Workspace {...props} />
  return <NotFoundPage {...props} />
}
