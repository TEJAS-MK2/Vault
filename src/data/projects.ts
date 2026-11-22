export type ProjectStatus = 'concept' | 'prototype' | 'active' | 'completed'

export type Project = {
  slug: string
  title: string
  category: string
  summary: string
  description: string
  status: ProjectStatus
  stack: string[]
  repositoryUrl: string
  demoUrl?: string
  featured: boolean
  year: number
}

export const projects: Project[] = [
  {
    slug: 'code-forge',
    title: 'Code Forge',
    category: 'Developer tooling',
    summary: 'A local-first browser workspace for building small web projects.',
    description: 'A browser IDE built around a multi-file editor, sandboxed live preview, diagnostics, recovery snapshots and portable project backups. Projects stay in the current browser profile rather than silently syncing to a cloud account.',
    status: 'active',
    stack: ['React', 'TypeScript', 'CodeMirror 6', 'Vite'],
    repositoryUrl: 'https://github.com/TEJAS-MK2/Code-Forge',
    demoUrl: 'https://tejas-mk2.github.io/Code-Forge/',
    featured: true,
    year: 2026,
  },
  {
    slug: 'atlas',
    title: 'ATLAS',
    category: 'Geospatial systems',
    summary: 'A map-first workspace for real-world exploration and spatial workflows.',
    description: 'A browser-based geospatial workspace combining interactive mapping, a 3D globe, spatial data formats and responsive field-console workflows.',
    status: 'active',
    stack: ['JavaScript', 'Leaflet', 'Three.js', 'GeoJSON'],
    repositoryUrl: 'https://github.com/TEJAS-MK2/ATLAS',
    demoUrl: 'https://tejas-mk2.github.io/ATLAS/',
    featured: true,
    year: 2026,
  },
  {
    slug: 'pijush-os',
    title: 'PIJUSH OS',
    category: 'Interface engineering',
    summary: 'A browser-based desktop environment with a Windows XP Luna-inspired shell.',
    description: 'A static web application that explores desktop metaphors in the browser: movable windows, built-in tools, a virtual filesystem, local persistence and a package sandbox.',
    status: 'active',
    stack: ['HTML', 'CSS', 'JavaScript', 'IndexedDB'],
    repositoryUrl: 'https://github.com/TEJAS-MK2/PIJUSH-WEB-OS',
    demoUrl: 'https://tejas-mk2.github.io/PIJUSH-WEB-OS/',
    featured: true,
    year: 2026,
  },
  {
    slug: 'modern-calculator',
    title: 'Modern Calculator',
    category: 'Software engineering',
    summary: 'A browser calculator backed by reusable calculation engines.',
    description: 'A calculator project that extends beyond its interface into reusable calculation libraries across multiple language ecosystems, including exact arithmetic and advanced mathematical utilities.',
    status: 'active',
    stack: ['TypeScript', 'JavaScript', 'Python', 'Ruby', 'Java', '.NET'],
    repositoryUrl: 'https://github.com/TEJAS-MK2/Calculator',
    demoUrl: 'https://tejas-mk2.github.io/Calculator/',
    featured: true,
    year: 2026,
  },
]

export const getProject = (slug: string) => projects.find((project) => project.slug === slug)
