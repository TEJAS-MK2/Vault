import { useEffect, useState, type ReactNode } from 'react'
import { CommandPalette } from './CommandPalette'
import { AgentMode } from './AgentMode'
export type Navigate = (path: string) => void
function useKolkataClock() {
 const [time,setTime]=useState(()=>new Date().toLocaleTimeString('en-IN',{timeZone:'Asia/Kolkata',hour:'numeric',minute:'2-digit',hour12:true}))
 useEffect(()=>{const update=()=>setTime(new Date().toLocaleTimeString('en-IN',{timeZone:'Asia/Kolkata',hour:'numeric',minute:'2-digit',hour12:true}));update();const interval=window.setInterval(update,30000);return()=>window.clearInterval(interval)},[])
 return time
}
export function SiteShell({children}:{children:ReactNode;navigate?:Navigate;pathname?:string}) {
 const time=useKolkataClock()
 const [dark,setDark]=useState(false)
 useEffect(()=>{document.documentElement.dataset.theme=dark?'dark':'light'},[dark])
 return <div className="reference-site">
  <a className="reference-skip" href="#main">Skip to content</a>
  <header className="reference-header">
   <a className="reference-brand" href="/" aria-label="Pijush home"><span className="reference-brand-mark">P.</span><span>PIJUSH<span className="reference-brand-dot">.</span></span></a>
   <nav className="reference-nav" aria-label="Main navigation"><a href="#journey">Journey</a><a href="#focus">Focus</a><a href="#opensource">Open source</a><a href="#contact">Contact</a></nav>
   <div className="reference-header-actions"><span className="reference-clock">{time} IST</span><CommandPalette/><AgentMode/><button className="reference-theme" type="button" onClick={()=>setDark(v=>!v)} aria-label={dark?'Switch to light theme':'Switch to dark theme'} title="Toggle theme">{dark?'☼':'◐'}</button></div>
  </header>
  <main id="main" tabIndex={-1}>{children}</main>
  <footer className="reference-footer"><span>PIJUSH / BUILT WITH CURIOSITY</span><span>© {new Date().getFullYear()}</span><a href="https://github.com/TEJAS-MK2" target="_blank" rel="noreferrer">GitHub ↗</a></footer>
 </div>
}