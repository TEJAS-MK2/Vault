import { useEffect, useMemo, useRef, useState } from 'react'
import type { ChangeEvent, DragEvent } from 'react'
import {
  Archive, ArrowDownToLine, AudioLines, Check, ChevronDown, Cloud, File,
  FileImage, FileText, Film, Folder, Grid2X2, HardDrive, Heart, LayoutGrid,
  Link2, List, LoaderCircle, LogOut, Menu, MoreHorizontal, Music2, Plus,
  Search, Settings2, ShieldCheck, SlidersHorizontal, Sparkles, Star, Trash2,
  UploadCloud, X
} from 'lucide-react'
import { supabase, storageBucket, isConfigured } from './lib/supabase'
import './styles.css'

type VaultFile = { name: string; id?: string; size?: number; updated_at?: string; created_at?: string; metadata?: Record<string, unknown> }
type Section = 'All files' | 'Recent' | 'Favorites' | 'Photos' | 'Videos' | 'Documents' | 'Audio' | 'Archives' | 'Trash'
const sections: { name: Section; icon: typeof File; kind?: string }[] = [
  { name: 'All files', icon: LayoutGrid }, { name: 'Recent', icon: Archive },
  { name: 'Favorites', icon: Star }, { name: 'Photos', icon: FileImage, kind: 'image' },
  { name: 'Videos', icon: Film, kind: 'video' }, { name: 'Documents', icon: FileText, kind: 'document' },
  { name: 'Audio', icon: Music2, kind: 'audio' }, { name: 'Archives', icon: Archive, kind: 'archive' },
  { name: 'Trash', icon: Trash2 }
]
const ext = (name: string) => name.split('.').pop()?.toLowerCase() ?? ''
const kind = (name: string) => {
  const e = ext(name)
  if (['jpg','jpeg','png','gif','webp','svg','heic','avif'].includes(e)) return 'image'
  if (['mp4','mov','mkv','webm'].includes(e)) return 'video'
  if (['mp3','wav','ogg','m4a','flac'].includes(e)) return 'audio'
  if (['zip','rar','7z','tar','gz'].includes(e)) return 'archive'
  if (['pdf','doc','docx','xls','xlsx','ppt','pptx','txt','md','csv'].includes(e)) return 'document'
  return 'file'
}
const prettySize = (bytes = 0) => bytes < 1024 ? bytes + ' B' : bytes < 1048576 ? (bytes / 1024).toFixed(1) + ' KB' : bytes < 1073741824 ? (bytes / 1048576).toFixed(1) + ' MB' : (bytes / 1073741824).toFixed(2) + ' GB'
const FileGlyph = ({ name }: { name: string }) => {
  const k = kind(name)
  const Icon = k === 'image' ? FileImage : k === 'video' ? Film : k === 'audio' ? AudioLines : k === 'archive' ? Archive : k === 'document' ? FileText : File
  return <span className={'file-glyph ' + k}><Icon size={19}/></span>
}

export default function App() {
  const [section, setSection] = useState<Section>('All files')
  const [files, setFiles] = useState<VaultFile[]>([])
  const [query, setQuery] = useState('')
  const [view, setView] = useState<'grid'|'list'>('grid')
  const [busy, setBusy] = useState(false)
  const [uploading, setUploading] = useState<string[]>([])
  const [dragging, setDragging] = useState(false)
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [signedIn, setSignedIn] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [mobileNav, setMobileNav] = useState(false)
  const picker = useRef<HTMLInputElement>(null)

  const refresh = async () => {
    if (!isConfigured || !supabase) return
    setBusy(true)
    const { data: auth } = await supabase.auth.getUser()
    if (!auth.user) { setSignedIn(false); setBusy(false); return }
    setSignedIn(true); setUserEmail(auth.user.email ?? '')
    const { data, error } = await supabase.storage.from(storageBucket).list('', { limit: 100, sortBy: { column: 'updated_at', order: 'desc' } })
    if (error) setMessage(error.message)
    else setFiles((data ?? []).filter(x => x.name !== '.emptyFolderPlaceholder'))
    setBusy(false)
  }
  useEffect(() => {
    if (!supabase) return
    void refresh()
    const { data } = supabase.auth.onAuthStateChange(() => { void refresh() })
    return () => data.subscription.unsubscribe()
  }, [])

  const visible = useMemo(() => files.filter(f => {
    const matches = f.name.toLowerCase().includes(query.toLowerCase())
    const k = kind(f.name)
    const bySection = section === 'All files' || section === 'Recent' || (section === 'Photos' && k === 'image') || (section === 'Videos' && k === 'video') || (section === 'Documents' && k === 'document') || (section === 'Audio' && k === 'audio') || (section === 'Archives' && k === 'archive')
    return matches && bySection
  }), [files, query, section])

  const upload = async (selected: FileList | File[]) => {
    if (!supabase || !signedIn) { setMessage('Connect and sign in to your VAULT cloud workspace before uploading.'); return }
    const items = Array.from(selected)
    for (const file of items) {
      setUploading(v => [...v, file.name])
      const path = file.name
      const { error } = await supabase.storage.from(storageBucket).upload(path, file, { upsert: false, contentType: file.type || undefined })
      if (error) setMessage(file.name + ': ' + error.message)
      setUploading(v => v.filter(x => x !== file.name))
    }
    await refresh()
  }
  const onDrop = (e: DragEvent) => { e.preventDefault(); setDragging(false); void upload(e.dataTransfer.files) }
  const signIn = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!supabase) return
    setBusy(true)
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: window.location.origin } })
    setMessage(error ? error.message : 'Check your inbox for your secure sign-in link.')
    setBusy(false)
  }
  const signOut = async () => { await supabase?.auth.signOut(); setSignedIn(false); setUserEmail('') }
  const total = files.reduce((n, f) => n + Number(f.metadata?.size ?? 0), 0)

  if (!isConfigured) return <main className="setup-screen">
    <div className="setup-card">
      <div className="brand-mark">V</div><p className="eyebrow">YOUR PERSONAL CLOUD</p><h1>Make room for<br/><em>everything.</em></h1>
      <p className="setup-copy">VAULT is ready for its cloud connection. Add your Supabase project details to enable private uploads, file browsing and secure access.</p>
      <div className="setup-steps"><div><span>01</span><p>Create or select your VAULT Supabase project.</p></div><div><span>02</span><p>Copy its project URL and publishable key into <code>.env</code>.</p></div><div><span>03</span><p>Create a private storage bucket named <code>{storageBucket}</code>.</p></div></div>
      <div className="setup-note"><Cloud size={18}/><span>Cloud-only by design. Your files will live in private remote storage, not browser storage.</span></div>
      <a className="text-link" href="https://supabase.com/dashboard" target="_blank" rel="noreferrer">Open Supabase dashboard ↗</a>
    </div>
  </main>

  if (!signedIn) return <main className="setup-screen"><form className="setup-card signin-card" onSubmit={signIn}>
    <div className="brand-mark">V</div><p className="eyebrow">WELCOME TO VAULT</p><h1>Your space,<br/><em>securely kept.</em></h1>
    <p className="setup-copy">Sign in with your email. We'll send you a secure one-time link.</p>
    <label className="field-label" htmlFor="email">Email address</label><input id="email" className="text-input" type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/>
    <button className="primary-button full" disabled={busy}>{busy ? <LoaderCircle className="spin" size={17}/> : null} Send sign-in link</button>
    {message && <p className="notice">{message}</p>}
  </form></main>

  return <div className="app-shell" onDragOver={e=>{e.preventDefault();setDragging(true)}} onDragLeave={e=>{if(e.currentTarget===e.target)setDragging(false)}} onDrop={onDrop}>
    {dragging && <div className="drop-overlay"><UploadCloud size={36}/><strong>Drop files to add to VAULT</strong><span>Files upload directly to your private cloud</span></div>}
    <aside className={'sidebar '+(mobileNav?'open':'')}>
      <div className="brand"><div className="brand-mark small">V</div><span>VAULT</span><button className="icon-button mobile-close" onClick={()=>setMobileNav(false)}><X size={18}/></button></div>
      <button className="upload-button" onClick={()=>picker.current?.click()}><Plus size={18}/> Upload files</button>
      <input ref={picker} hidden type="file" multiple onChange={e=>{if(e.target.files)void upload(e.target.files);e.target.value=''}}/>
      <p className="nav-caption">WORKSPACE</p>
      <nav>{sections.map(item=>{const Icon=item.icon;return <button key={item.name} className={'nav-item '+(section===item.name?'active':'')} onClick={()=>{setSection(item.name);setMobileNav(false)}}><Icon size={17}/><span>{item.name}</span>{item.name==='All files'&&<small>{files.length}</small>}</button>})}</nav>
      <div className="sidebar-bottom"><div className="storage-card"><div className="storage-heading"><HardDrive size={15}/><span>Cloud storage</span></div><strong>{prettySize(total)}</strong><div className="storage-track"><span style={{width:'0%'}}/></div><small>Usage details will appear here</small></div><button className="nav-item" onClick={()=>setMessage('Settings are coming next.')}><Settings2 size={17}/> Settings</button><div className="profile-row"><div className="avatar">{(userEmail[0]??'V').toUpperCase()}</div><div className="profile-copy"><strong>{userEmail.split('@')[0]}</strong><small>{userEmail}</small></div><button className="icon-button" title="Sign out" onClick={signOut}><LogOut size={16}/></button></div></div>
    </aside>
    <main className="main-area">
      <header className="topbar"><button className="icon-button menu-toggle" onClick={()=>setMobileNav(true)}><Menu size={20}/></button><div className="breadcrumbs">Workspace <span>/</span> <strong>{section}</strong></div><div className="top-actions"><div className="search-box"><Search size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search your files"/><kbd>⌘ K</kbd></div><button className="icon-button" title="Preferences" onClick={()=>setMessage('Preferences are coming next.')}><Settings2 size={18}/></button><div className="avatar top-avatar">{(userEmail[0]??'V').toUpperCase()}</div></div></header>
      <div className="content">
        <div className="page-heading"><div><p className="eyebrow">YOUR PRIVATE WORKSPACE</p><h1>{section}</h1><p className="subheading">A little more room for everything that matters.</p></div><button className="primary-button" onClick={()=>picker.current?.click()}><UploadCloud size={17}/> Upload files</button></div>
        <div className="quick-stats"><div className="stat"><span>Items stored</span><strong>{files.length}</strong><small>Across your cloud workspace</small></div><div className="stat"><span>Cloud space used</span><strong>{prettySize(total)}</strong><small>Based on listed file metadata</small></div><div className="stat"><span>Connection</span><strong className="connected"><i/> Secure</strong><small>Authenticated cloud session</small></div></div>
        <div className="section-toolbar"><div><h2>{query ? 'Search results' : section==='All files'?'All items':section}</h2><span>{visible.length} {visible.length===1?'item':'items'}</span></div><div className="toolbar-actions"><button className="filter-button" onClick={()=>setMessage('More filters are coming next.')}><SlidersHorizontal size={16}/> Filter</button><div className="view-switch"><button className={view==='grid'?'selected':''} onClick={()=>setView('grid')} title="Grid view"><Grid2X2 size={16}/></button><button className={view==='list'?'selected':''} onClick={()=>setView('list')} title="List view"><List size={17}/></button></div></div></div>
        {busy ? <div className="loading-state"><LoaderCircle className="spin" size={22}/> Loading your cloud files…</div> : visible.length===0 ? <div className="empty-state"><div className="empty-icon"><Cloud size={26}/></div><h3>{query?'No matching files':'Your space is ready'}</h3><p>{query?'Try another search term.':'Upload your first file and it will be safely stored in your private cloud workspace.'}</p><button className="primary-button" onClick={()=>picker.current?.click()}><Plus size={17}/> Add your first file</button></div> : <div className={view==='grid'?'file-grid':'file-list'}>{visible.map(f=><article className="file-card" key={f.id??f.name}><div className="file-preview"><FileGlyph name={f.name}/><button className="more-button" onClick={()=>setMessage('File actions are being built.')}><MoreHorizontal size={18}/></button></div><div className="file-info"><strong title={f.name}>{f.name}</strong><span>{prettySize(Number(f.metadata?.size??0))} <i>·</i> {f.updated_at?new Date(f.updated_at).toLocaleDateString():'Cloud file'}</span></div></article>)}</div>}
        {uploading.length>0&&<div className="upload-queue"><div className="queue-title"><span><LoaderCircle className="spin" size={15}/> Uploading {uploading.length} {uploading.length===1?'file':'files'}</span><button className="icon-button" onClick={()=>setUploading([])}><X size={16}/></button></div>{uploading.map(n=><div className="queue-file" key={n}><File size={15}/>{n}<span>Uploading…</span></div>)}</div>}
      </div>
      <footer className="footer-note"><span><ShieldCheck size={14}/> Your files are stored privately</span><span>VAULT · Personal cloud storage</span></footer>
    </main>
    {message&&<div className="toast" role="status"><span>{message}</span><button className="icon-button" onClick={()=>setMessage('')}><X size={15}/></button></div>}
  </div>
}
