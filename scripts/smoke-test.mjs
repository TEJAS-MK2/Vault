import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'

const htmlPath = 'dist/index.html'
const fallbackPath = 'dist/404.html'

assert.ok(existsSync(htmlPath), 'Vite must create dist/index.html')
assert.ok(existsSync(fallbackPath), 'GitHub Pages needs a 404.html SPA fallback')

const html = readFileSync(htmlPath, 'utf8')
const fallback = readFileSync(fallbackPath, 'utf8')

assert.match(html, /<title>VAULT — A little more room for everything<\/title>/, 'The public home page title must be present')
assert.match(html, /\/Vault\/assets\//, 'Bundled assets must use the GitHub Pages repository base path')
assert.match(html, /Content-Security-Policy/, 'The production document must ship a CSP')
assert.equal(fallback, html, 'The 404 fallback must load the same router and assets as the app')

console.log('VAULT smoke test passed: homepage, Pages base path, CSP and 404 fallback are present.')
