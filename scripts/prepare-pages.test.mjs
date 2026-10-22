import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, sep } from 'node:path';
import test from 'node:test';
import { preparePages, requiredCsp } from './prepare-pages.mjs';
import { pageImages, unpublishedImages } from './pages-assets.mjs';

function fixture(t, omitImage) {
  const root = mkdtempSync(join(tmpdir(), '168works-pages-test-'));
  t.after(() => {
    if (!resolve(root).startsWith(resolve(tmpdir()) + sep + '168works-pages-test-')) {
      throw new Error('Invalid temporary cleanup directory');
    }
    rmSync(root, { recursive: true, force: true });
  });
  mkdirSync(join(root, 'public/images'), { recursive: true });
  mkdirSync(join(root, 'dist/assets'), { recursive: true });
  for (const image of [...pageImages, ...unpublishedImages]) {
    if (image !== omitImage) writeFileSync(join(root, 'public/images', image), 'synthetic image fixture');
  }
  writeFileSync(join(root, 'dist/assets/index-abcdefgh.js'), 'export {};');
  writeFileSync(join(root, 'dist/assets/index-abcdefgh.css'), 'body {}');
  writeFileSync(join(root, 'dist/index.html'), `<!doctype html><head>
<meta http-equiv="Content-Security-Policy" content="${requiredCsp.replace(/'/g, '&#39;')}">
<meta name="robots" content="noindex, nofollow, noimageindex">
<meta name="referrer" content="no-referrer"></head>`);
  return root;
}

test('only reviewed, used images are copied to the site', t => {
  const root = fixture(t);
  preparePages(root);
  assert.deepEqual(readdirSync(join(root, 'dist/images')).sort(), [...pageImages].sort());
});

test('an unexpected nested public file prevents publication', t => {
  const root = fixture(t);
  mkdirSync(join(root, 'public/internal'));
  writeFileSync(join(root, 'public/internal/dummy-notes.txt'), 'harmless synthetic internal document');
  assert.throws(() => preparePages(root), /Unreviewed public files/);
});

test('a source map or extra build file prevents publication', t => {
  const root = fixture(t);
  writeFileSync(join(root, 'dist/assets/index-abcdefgh.js.map'), '{}');
  assert.throws(() => preparePages(root), /Unexpected build files/);
});

test('a missing required image prevents publication', t => {
  const root = fixture(t, pageImages[0]);
  assert.throws(() => preparePages(root), /Missing required image/);
});

test('a missing security policy prevents publication', t => {
  const root = fixture(t);
  writeFileSync(join(root, 'dist/index.html'), '<!doctype html><head></head>');
  assert.throws(() => preparePages(root), /noindex policy is missing/);
});

test('a weakened CSP prevents publication', t => {
  const root = fixture(t);
  writeFileSync(join(root, 'dist/index.html'), `<!doctype html><head>
<meta name="robots" content="noindex, nofollow, noimageindex">
<meta http-equiv="Content-Security-Policy" content="${requiredCsp}; script-src * 'unsafe-inline'">
<meta name="referrer" content="no-referrer"></head>`);
  assert.throws(() => preparePages(root), /CSP is missing or weakened/);
});
