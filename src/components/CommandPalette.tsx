import {useEffect,useMemo,useRef,useState} from 'react'
type Command={label:string;detail:string;href:string}
const commands:Command[]=[
 {label:'Home',detail:'Back to the introduction',href:'#main'},
 {label:'GitHub journey',detail:'Browse public repositories by date',href:'#journey'},
 {label:'Current focus',detail:'What I am learning and exploring',href:'#focus'},
 {label:'Open source',detail:'Public work and contributions',href:'#opensource'},
 {label:'Contact',detail:'Find me on GitHub',href:'#contact'},
 {label:'GitHub profile',detail:'TEJAS-MK2 on GitHub',href:'https://github.com/TEJAS-MK2'},
 {label:'Agent profile',detail:'Machine-readable public profile',href:'/llms.txt'}
]
export function CommandPalette(){
 const[open,setOpen]=useState(false),[query,setQuery]=useState(''),[active,setActive]=useState(0)
 const inputRef=useRef<HTMLInputElement>(null)
 const filtered=useMemo(()=>commands.filter(x=>(x.label+' '+x.detail).toLowerCase().includes(query.toLowerCase())),[query])
 useEffect(()=>{const onKey=(e:KeyboardEvent)=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();setOpen(v=>!v)}if(e.key==='Escape')setOpen(false)};window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey)},[])
 useEffect(()=>{if(open){setQuery('');setActive(0);requestAnimationFrame(()=>inputRef.current?.focus())}},[open])
 const run=(item:Command)=>{setOpen(false);if(item.href.startsWith('#'))document.querySelector(item.href)?.scrollIntoView({behavior:'smooth'});else window.location.assign(item.href)}
 return <><button className="reference-command-trigger" type="button" onClick={()=>setOpen(true)} aria-haspopup="dialog" aria-expanded={open}>⌕ <span>Find</span></button>{open&&<div className="reference-command-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setOpen(false)}}><section className="reference-command-dialog" role="dialog" aria-modal="true" aria-label="Quick navigation"><div className="reference-command-search"><span>⌕</span><input ref={inputRef} value={query} onChange={e=>{setQuery(e.target.value);setActive(0)}} onKeyDown={e=>{if(e.key==='ArrowDown'){e.preventDefault();setActive(v=>Math.min(v+1,filtered.length-1))}if(e.key==='ArrowUp'){e.preventDefault();setActive(v=>Math.max(0,v-1))}if(e.key==='Enter'&&filtered[active]){e.preventDefault();run(filtered[active])}}} placeholder="Search this site…" aria-label="Search this site"/><kbd>ESC</kbd></div><p className="reference-command-label">GO TO</p><div className="reference-command-list">{filtered.length?filtered.map((item,index)=><button type="button" key={item.label} className={index===active?'reference-command-item active':'reference-command-item'} onMouseEnter={()=>setActive(index)} onClick={()=>run(item)}><span><strong>{item.label}</strong><small>{item.detail}</small></span><span>↗</span></button>):<p className="reference-command-empty">Nothing found.</p>}</div><div className="reference-command-hints"><span>↑↓ MOVE</span><span>↵ OPEN</span><span>ESC CLOSE</span></div></section></div>}</>
}