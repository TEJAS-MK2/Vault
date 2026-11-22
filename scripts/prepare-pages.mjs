import assert from 'node:assert/strict'
import { copyFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'

const entry = 'dist/index.html'
assert.ok(existsSync(entry), 'Build the Vite app before preparing GitHub Pages routes')

// Materialize the known client-side routes as real Pages documents. This keeps
// the React router in control while avoiding HTTP 404 responses for deep links.
const routes = [
  'about',
  'projects/code-forge',
  'projects/atlas',
  'projects/pijush-os',
  'projects/modern-calculator',
  'experiments',
  'writing',
  'uses',
  'now',
  'contact',
]

for (const route of routes) {
  const target = join('dist', route, 'index.html')
  mkdirSync(dirname(target), { recursive: true })
  copyFileSync(entry, target)
}

copyFileSync(entry, 'dist/404.html')
console.log(`Prepared ${routes.length} direct GitHub Pages routes and the SPA fallback.`)
