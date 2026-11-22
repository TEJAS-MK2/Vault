import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const app = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8')
const shell = readFileSync(new URL('../src/components/SiteShell.tsx', import.meta.url), 'utf8')
const styles = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8') + readFileSync(new URL('../src/reference-style.css', import.meta.url), 'utf8')
const policies = readFileSync(new URL('../supabase/storage-policies.sql', import.meta.url), 'utf8')

test('portfolio routes are explicit and unknown routes resolve to a not-found page', () => {
  for (const route of ['/about', '/experiments', '/writing', '/uses', '/now', '/contact']) {
    assert.ok(app.includes(`'${route}'`), `Missing route ${route}`)
  }
  assert.match(app, /return <NotFoundPage \/>/)
})

test('the portfolio no longer imports the legacy storage client', () => {
  assert.doesNotMatch(app, /supabase|storageBucket|signInWithOtp/)
})

test('legacy storage policies remain present and idempotent during the frontend migration', () => {
  const names = [
    'VAULT users can read their own files',
    'VAULT users can upload to their own folder',
    'VAULT users can update their own files',
    'VAULT users can delete their own files'
  ]
  for (const name of names) {
    assert.ok(policies.includes(`drop policy if exists "${name}" on storage.objects;`), `Missing idempotent drop for ${name}`)
    assert.equal((policies.match(new RegExp(`create policy "${name}"`, 'g')) ?? []).length, 1)
  }
})

test('wordmark accessible name includes its visible label and muted text meets the updated contrast token', () => {
  assert.match(shell, /aria-label="Pijush home"/)
  assert.match(styles, /--muted:#77766f/)
})



test('the personal site uses a chronological GitHub journey without dedicated project detail routes', () => {
  assert.doesNotMatch(app, /\/projects\/|data\/projects|ProjectDetailPage|getProject/)
  const pages = readFileSync(new URL('../src/pages/Pages.tsx', import.meta.url), 'utf8')
  assert.doesNotMatch(pages, /ProjectArtwork|CaseStudyContent|featured-grid|selected-work|ProjectDetailPage/)
  assert.match(pages, /GitHubTimeline/)
})

test('reference-inspired homepage keeps Pijush identity, real interests and accessible interactions', () => {
  const pages = readFileSync(new URL('../src/pages/Pages.tsx', import.meta.url), 'utf8')
  assert.match(pages, /Pijush/)
  assert.match(pages, /Systems & infrastructure/)
  assert.match(pages, /Creative web/)
  assert.match(pages, /Developer tools/)
  assert.match(shell, /Projects/)
  assert.match(shell, /AgentMode/)
  assert.match(styles, /reference-hero/)
  assert.match(styles, /prefers-reduced-motion/)
})
