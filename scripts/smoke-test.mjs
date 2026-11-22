import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'

const htmlPath = 'dist/index.html'
const fallbackPath = 'dist/404.html'
const assetsPath = 'dist/assets'

assert.ok(existsSync(htmlPath), 'Vite must create dist/index.html')
assert.ok(existsSync(fallbackPath), 'GitHub Pages needs a 404.html SPA fallback')
assert.ok(existsSync(assetsPath), 'Vite must emit an assets directory')
assert.ok(!existsSync('dist/projects'), 'No project pages or project directory may be generated')

const html = readFileSync(htmlPath, 'utf8')
const fallback = readFileSync(fallbackPath, 'utf8')
const assets = readdirSync(assetsPath)
const cssAssets = assets.filter((name) => name.endsWith('.css'))
const jsAssets = assets.filter((name) => name.endsWith('.js'))

assert.match(html, /<title>PIJUSH — Creative developer<\/title>/, 'The portfolio title must be present')
assert.match(html, /\/assets\//, 'Bundled assets must use the custom-domain root path')
assert.doesNotMatch(html, /\/Vault\/assets\//, 'The old GitHub repository subpath must not remain')
assert.match(html, /Content-Security-Policy/, 'The production document must ship a CSP')
assert.match(html, /twitter:card/, 'Social preview metadata must include a Twitter card')
assert.doesNotMatch(html, /supabase\.co/, 'The public portfolio must not connect to the legacy Supabase project')
assert.equal(fallback, html, 'The 404 fallback must load the same router and assets as the app')

const routes = [
  'about',
  'experiments',
  'writing',
  'uses',
  'now',
  'contact',
]
for (const route of routes) {
  const routeHtml = `dist/${route}/index.html`
  assert.ok(existsSync(routeHtml), `GitHub Pages must have a direct document for /${route}/`)
  assert.equal(readFileSync(routeHtml, 'utf8'), html, `The /${route}/ document must load the same app entry`)
}

assert.ok(cssAssets.length > 0, 'The application must emit a CSS bundle')
assert.ok(jsAssets.length > 0, 'The application must emit a JavaScript bundle')

const cssPath = assetsPath + '/' + cssAssets[0]
const css = readFileSync(cssPath, 'utf8')
assert.ok(statSync(cssPath).size > 5000, 'The CSS bundle must contain the portfolio styles')
assert.match(css, /home-hero/, 'Homepage styles must be present in the CSS bundle')
assert.match(css, /manifesto/, 'Personal editorial content must be present in the CSS bundle')
assert.match(css, /art-source/, 'Artwork must be clearly distinguished from genuine screenshots')
assert.match(css, /skip-link/, 'The production stylesheet must include the keyboard skip link')

const js = jsAssets.map((name) => readFileSync(assetsPath + '/' + name, 'utf8')).join('\n')
for (const route of ['/about', '/experiments', '/writing', '/uses', '/now', '/contact', 'Curiosity is the', 'Have a good']) {
  assert.ok(js.includes(route), `The application route ${route} must be included in the production bundle`)
}

assert.ok(existsSync('dist/assets'), 'The production assets must be present')
assert.doesNotMatch(js, /Code Forge|Modern Calculator|ATLAS|PIJUSH OS|calculator-screenshot|\/projects\//, 'Project content and routes must not ship in the personal website')
console.log('PIJUSH smoke test passed: metadata, CSP, personal routes, removed project content and production assets are present.')
