export type CaseStudySection = { title: string; body: string; points?: string[] }

export type CaseStudy = {
  context: string
  approach: string
  sections: CaseStudySection[]
  constraints: string[]
  note: string
}

export const caseStudies: Record<string, CaseStudy> = {
  'code-forge': {
    context: 'A small web project often needs more than a text area: multiple files, a useful preview loop, diagnostics and a safe way to keep work portable. Code Forge brings those pieces into one browser workspace without requiring an account or a hosted application backend.',
    approach: 'Keep the workspace local to the browser profile, make the editing loop immediate, and make recovery/export visible rather than treating browser storage as a backup.',
    sections: [
      { title: 'The editing surface', body: 'CodeMirror 6 provides the editor foundation for HTML, CSS and JavaScript. The workspace adds file tabs, a virtual file explorer, search and replace, keyboard controls and per-file editing history.' },
      { title: 'A separated preview', body: 'The live preview runs in a sandboxed iframe with scripts enabled but without same-origin privilege. This separates the preview origin from the editor, while keeping the Run and Refresh loop close to the code.' },
      { title: 'Persistence with an exit route', body: 'Named projects, autosave and recovery snapshots use browser-local storage. JSON and ZIP exports make the workspace portable, and import validation checks a complete workspace before replacing the current one.' },
      { title: 'Diagnostics, not a language server', body: 'HTML, CSS and JavaScript parser checks surface lightweight diagnostics and source navigation. They are intentionally not presented as a full compiler, type checker or language server.' },
    ],
    constraints: ['Projects stay in the current browser profile; there is no cloud sync.', 'Browser storage can be cleared or reach quota, so exported backups remain important.', 'Sandboxing does not make arbitrary code safe: code run in the preview can still make network requests or show deceptive content.'],
    note: 'Feature and security details are described in the project README; they are not a claim that arbitrary user code is safe.'
  },
  atlas: {
    context: 'Maps are useful as more than a backdrop. ATLAS treats the map as the primary workspace and brings exploration, navigation, feature inspection and spatial analysis around that canvas.',
    approach: 'Use public geospatial services and browser-side data workflows, while keeping provider limitations and privacy boundaries explicit.',
    sections: [
      { title: 'Explore and navigate', body: 'The workspace documents five basemaps, place search, cursor coordinates, map-center inspection, driving-route alternatives, nearby points of interest and distance measurement.' },
      { title: 'Work with spatial data', body: 'GeoJSON import and export support a feature inspector, feature summaries, line-length and polygon-area calculations, spatial bounds and filtering of the active feature set.' },
      { title: 'A configurable field workspace', body: 'Saved places, named map views, workspace profiles and dashboard widgets let the user shape the map workspace. Layer styling adjusts overlay appearance without rewriting source GeoJSON.' },
      { title: 'Local-first signals', body: 'Historical activity summaries are stored locally. Optional geospatial change monitoring polls public OpenStreetMap/Overpass data while the tab is active; it is not a guaranteed real-time or emergency alert feed.' },
    ],
    constraints: ['Public providers control their own coverage, availability and rate limits.', 'Map tiles remain network-dependent when offline, even though the PWA shell can cache local modules.', 'GPS access is user-initiated; external map data and routes should not be mistaken for authoritative operational intelligence.'],
    note: 'Capability descriptions reflect the repository documentation. Provider data quality and availability are outside the application’s control.'
  },
  'pijush-os': {
    context: 'Desktop interfaces have recognizable spatial ideas: windows, a taskbar, a launcher, files and system tools. PIJUSH OS explores how much of that interaction model can live inside a static browser application.',
    approach: 'Build a browser-based desktop shell with a virtual filesystem and local persistence, rather than presenting it as a native operating system.',
    sections: [
      { title: 'A desktop in the browser', body: 'The Luna-inspired shell includes an application launcher, dock, desktop shortcuts and movable, minimizable, maximizable and closable windows. Built-in tools include a file manager, text editor, terminal, calculator and system utilities.' },
      { title: 'A virtual workspace', body: 'An IndexedDB-backed virtual filesystem supports workspace files and app data. Validated paths, backup import/export and recovery tools provide ways to inspect and restore that browser-local workspace.' },
      { title: 'An app package boundary', body: 'The package manager validates package metadata, permissions, entry points and size limits. Third-party packages run in sandboxed iframes with a restrictive content policy and namespaced filesystem paths.' },
      { title: 'Honest system information', body: 'System Center reports browser-exposed session and storage information. It deliberately avoids inventing CPU usage because standard browser APIs do not expose a reliable system CPU percentage.' },
    ],
    constraints: ['This is a static browser application, not a bootable or native operating system.', 'Workspace data is local to the browser/device and can still be removed by browser cleanup.', 'A package checksum detects content changes but is not a publisher signature; packages should still be treated as untrusted.'],
    note: 'The Windows XP/Luna visual language is an interface inspiration, not an affiliation with or distribution of Windows.'
  },
  'modern-calculator': {
    context: 'A calculator interface can be the entry point to a deeper engineering problem: reusable expression engines, numerical utilities and predictable arithmetic across language ecosystems.',
    approach: 'Use the browser UI as a practical demonstration surface, while maintaining separate reusable calculation packages for multiple programming languages.',
    sections: [
      { title: 'A focused browser interface', body: 'The web application combines standard arithmetic with scientific functions, history, keyboard input, statistics, matrices, themes and a progressive web app shell.' },
      { title: 'Reusable calculation engines', body: 'The repository documents implementations for JavaScript, Python, Ruby, Java, Gradle and .NET, each maintained as a package rather than a copy of the browser interface.' },
      { title: 'Precision as a design concern', body: 'The JavaScript package includes a BigInt-backed exact rational arithmetic engine for calculations that should not silently lose integer precision through JavaScript Number arithmetic.' },
      { title: 'A practical scope', body: 'The project describes itself as a hobbyist project. The goal is to develop reusable calculation engines with expression parsing, scientific functions, statistics, numerical methods and explicit error handling—not to claim a production scientific-computing platform.' },
    ],
    constraints: ['Language packages have their own runtime and toolchain requirements.', 'Exact rational arithmetic is a specific capability, not a guarantee that every numerical method is symbolically exact.', 'The project is explicitly scoped as a hobbyist engineering effort.'],
    note: 'Package names, supported runtimes and capabilities are documented in the source repository; package availability can change independently.'
  }
}

export const getCaseStudy = (slug: string) => caseStudies[slug]
