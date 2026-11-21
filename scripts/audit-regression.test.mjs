import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const app = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8')
const policies = readFileSync(new URL('../supabase/storage-policies.sql', import.meta.url), 'utf8')

test('magic-link requests always release the busy state after failures', () => {
  assert.match(app, /signInWithOtp\([\s\S]*?catch \(cause\)[\s\S]*?finally \{\s*setBusy\(false\)/)
})

test('session lookup handles rejected network requests', () => {
  assert.match(app, /auth\.getUser\(\)[\s\S]*?\.catch\(\(\) =>/)
  assert.match(app, /\.finally\(\(\) =>\s*\{\s*if \(mounted\) setAuthReady\(true\)/)
})

test('file listing ignores stale requests and releases loading state', () => {
  assert.match(app, /const refreshSequence = useRef\(0\)/)
  assert.match(app, /requestId !== refreshSequence\.current/)
  assert.match(app, /if \(requestId === refreshSequence\.current\) setBusy\(false\)/)
})

test('reserved folder marker cannot be uploaded or used as a renamed file', () => {
  assert.match(app, /name === '\.emptyFolderPlaceholder'[\s\S]*?reserved for VAULT folder metadata/)
})

test('storage policies can be safely re-applied', () => {
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
