type ProjectArtworkProps = { slug: string }

export default function ProjectArtwork({ slug }: ProjectArtworkProps) {
  if (slug === 'atlas') return <svg className="project-visual atlas-visual" viewBox="0 0 720 420" role="img" aria-label="Abstract spatial map visualization">
    <defs><radialGradient id="atlasGlow"><stop stopColor="#8b7cff" stopOpacity=".5"/><stop offset="1" stopColor="#8b7cff" stopOpacity="0"/></radialGradient><pattern id="atlasGrid" width="28" height="28" patternUnits="userSpaceOnUse"><path d="M28 0H0V28" fill="none" stroke="#a9a3ff" strokeOpacity=".18"/></pattern></defs>
    <rect width="720" height="420" fill="#111521"/><rect width="720" height="420" fill="url(#atlasGrid)"/><circle cx="510" cy="205" r="185" fill="url(#atlasGlow)"/>
    <g fill="none" stroke="#a99dff" strokeOpacity=".7"><path d="M0 280 110 240 180 270 260 190 350 210 430 125 520 150 610 70 720 90"/><path d="M20 340 120 300 220 330 310 250 400 265 490 185 580 210 680 135"/><path d="M110 0 150 100 130 190 180 270 160 420M320 0 340 95 310 210 350 300 330 420M540 0 520 90 550 200 510 300 540 420"/></g>
    <g fill="#b6f36b"><circle cx="430" cy="125" r="5"/><circle cx="260" cy="190" r="4"/><circle cx="520" cy="150" r="4"/></g>
    <g fill="#e8e7f5" fontFamily="monospace" fontSize="11" opacity=".72"><text x="26" y="34">ATLAS / SPATIAL WORKSPACE</text><text x="26" y="390">LAYER 04 — TERRAIN / VECTOR</text><text x="568" y="390">22.57° N</text></g>
    <path d="M430 125 480 70 520 150" fill="none" stroke="#b6f36b" strokeDasharray="4 5"/>
  </svg>
  if (slug === 'pijush-os') return <svg className="project-visual os-visual" viewBox="0 0 720 420" role="img" aria-label="Abstract browser desktop interface inspired by classic desktop systems">
    <rect width="720" height="420" fill="#182338"/><circle cx="590" cy="75" r="180" fill="#24456b" opacity=".5"/>
    <rect x="78" y="54" width="564" height="310" rx="10" fill="#d9e7f3" stroke="#f4f8ff" strokeWidth="2"/>
    <path d="M88 64h544v30H88z" fill="#2463a8"/><circle cx="104" cy="79" r="4" fill="#ffce66"/><circle cx="119" cy="79" r="4" fill="#f18d75"/><circle cx="134" cy="79" r="4" fill="#8bd5a7"/>
    <rect x="88" y="94" width="544" height="230" fill="#eaf1f8"/><rect x="105" y="110" width="160" height="196" rx="4" fill="#fff" stroke="#c3d2e1"/><rect x="280" y="110" width="335" height="196" rx="4" fill="#fff" stroke="#c3d2e1"/>
    <g fill="#3279bb"><rect x="120" y="127" width="130" height="9" rx="4"/><rect x="120" y="151" width="92" height="7" rx="3" opacity=".5"/><rect x="120" y="172" width="112" height="7" rx="3" opacity=".5"/><rect x="120" y="193" width="78" height="7" rx="3" opacity=".5"/></g>
    <rect x="298" y="130" width="118" height="72" rx="4" fill="#dceafa"/><rect x="430" y="130" width="166" height="8" rx="4" fill="#9eb4ca"/><rect x="430" y="150" width="140" height="7" rx="4" fill="#c0cedb"/><rect x="430" y="169" width="155" height="7" rx="4" fill="#c0cedb"/><rect x="298" y="220" width="298" height="62" rx="4" fill="#edf5fb"/>
    <rect x="88" y="324" width="544" height="30" fill="#174e8d"/><circle cx="108" cy="339" r="8" fill="#79c2f5"/><g fill="#f0f6ff" fontFamily="monospace" fontSize="10"><text x="130" y="343">PIJUSH WEB DESKTOP</text><text x="528" y="343">LOCAL SESSION</text></g>
  </svg>
  if (slug === 'modern-calculator') return <img className="project-visual calc-screenshot" src="https://raw.githubusercontent.com/TEJAS-MK2/Calculator/main/calculator-screenshot.png" alt="Screenshot of the Modern Calculator application interface" loading="lazy" decoding="async" />
  if (slug === 'modern-calculator-illustration') return <svg className="project-visual calc-visual" viewBox="0 0 720 420" role="img" aria-label="Abstract mathematical calculation interface">
    <defs><pattern id="calcGrid" width="36" height="36" patternUnits="userSpaceOnUse"><path d="M36 0H0V36" fill="none" stroke="#b6f36b" strokeOpacity=".12"/></pattern></defs>
    <rect width="720" height="420" fill="#141a17"/><rect width="720" height="420" fill="url(#calcGrid)"/>
    <g fill="#b6f36b" fontFamily="monospace"><text x="42" y="52" fontSize="12" letterSpacing="3">CALC / ENGINE 04</text><text x="42" y="190" fontSize="82" letterSpacing="-8">∑ x²</text><text x="48" y="232" fontSize="16" opacity=".65">EXACT ARITHMETIC</text></g>
    <g fill="none" stroke="#b6f36b" strokeWidth="1.4" opacity=".75"><path d="M390 90h260v240H390z"/><path d="M420 130h200M420 180h200M420 230h200M420 280h200M470 110v190M520 110v190M570 110v190"/><path d="M70 300c70-110 120 70 200-20s80-80 120-100" stroke="#8b7cff" strokeWidth="3"/></g>
    <g fill="#f1f0eb" fontFamily="monospace" fontSize="12"><text x="418" y="116">FUNCTION</text><text x="418" y="354">PRECISION / 10⁻¹²</text><text x="42" y="370">f(x) = (x + 1)(x − 1)</text></g>
    <circle cx="390" cy="180" r="5" fill="#8b7cff"/><circle cx="520" cy="230" r="5" fill="#b6f36b"/>
  </svg>
  if (slug === 'code-forge') return <svg className="project-visual forge-visual" viewBox="0 0 720 420" role="img" aria-label="Abstract multi-file browser code editor interface">
    <rect width="720" height="420" fill="#15151d"/><rect x="24" y="28" width="672" height="364" rx="8" fill="#1b1d28" stroke="#3a3d4d"/>
    <path d="M24 68h672" stroke="#3a3d4d"/><circle cx="48" cy="48" r="5" fill="#f28c83"/><circle cx="66" cy="48" r="5" fill="#e8c36a"/><circle cx="84" cy="48" r="5" fill="#9bcf7a"/>
    <rect x="24" y="69" width="145" height="323" fill="#20232f"/><g fill="#9ea2b2" fontFamily="monospace" fontSize="11"><text x="42" y="98">EXPLORER</text><text x="42" y="132" fill="#b6f36b">▾ src</text><text x="58" y="157">App.tsx</text><text x="58" y="182">styles.css</text><text x="42" y="218">▸ public</text><text x="42" y="250">package.json</text><text x="42" y="282">README.md</text></g>
    <g fontFamily="monospace" fontSize="13"><g fill="#72798d"><text x="190" y="105">01</text><text x="190" y="135">02</text><text x="190" y="165">03</text><text x="190" y="195">04</text><text x="190" y="225">05</text><text x="190" y="255">06</text><text x="190" y="285">07</text><text x="190" y="315">08</text></g><g fill="#d5d7e0"><text x="222" y="105">export function Workspace() {'{'}</text><text x="246" y="135">const [files, setFiles] = useState([])</text><text x="246" y="165">const preview = compile(files)</text><text x="246" y="195">return (</text><text x="270" y="225"> &lt;Editor value={'{'}activeFile{'}'} /&gt;</text><text x="270" y="255"> &lt;Preview source={'{'}preview{'}'} /&gt;</text><text x="246" y="285">)</text><text x="222" y="315">{'}'}</text></g><path d="M222 341h320" stroke="#b6f36b" strokeOpacity=".5"/></g>
    <rect x="548" y="84" width="126" height="286" rx="5" fill="#e8e9ee"/><rect x="560" y="98" width="102" height="8" rx="4" fill="#aeb5c5"/><rect x="560" y="122" width="80" height="6" rx="3" fill="#c5cad4"/><rect x="560" y="145" width="102" height="82" rx="3" fill="#c4d8d0"/><rect x="560" y="242" width="102" height="6" rx="3" fill="#aeb5c5"/><rect x="560" y="258" width="82" height="6" rx="3" fill="#c5cad4"/><rect x="560" y="274" width="92" height="6" rx="3" fill="#c5cad4"/>
  </svg>
  return <div className="project-visual fallback-visual"><span>PIJUSH / WORKS</span></div>
}
