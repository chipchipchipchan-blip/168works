import { copyFileSync, lstatSync, mkdirSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { pageImages, unpublishedImages } from './pages-assets.mjs';

export const requiredCsp = "default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self'; connect-src 'self'; base-uri 'none'; object-src 'none'; form-action 'none'";

function filesIn(directory, prefix = '') {
  if (!lstatSync(directory).isDirectory() || lstatSync(directory).isSymbolicLink()) {
    throw new Error(`Not a regular directory: ${directory}`);
  }
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const relative = prefix + entry.name;
    if (entry.isSymbolicLink()) throw new Error(`Symlinks are not publishable: ${relative}`);
    if (entry.isDirectory()) return filesIn(join(directory, entry.name), relative + '/');
    if (!entry.isFile()) throw new Error(`Unsupported file: ${relative}`);
    return [relative];
  });
}

export function preparePages(root) {
  const publicDirectory = join(root, 'public');
  const distDirectory = join(root, 'dist');
  const published = pageImages.map(name => 'images/' + name);
  const reviewed = new Set([
    ...published,
    ...unpublishedImages.map(name => 'images/' + name),
    'images/.gitkeep',
  ]);
  const publicFiles = filesIn(publicDirectory);
  const unexpectedPublic = publicFiles.filter(file => !reviewed.has(file));
  if (unexpectedPublic.length) {
    throw new Error(`Unreviewed public files (nothing published): ${unexpectedPublic.join(', ')}`);
  }
  for (const file of published) {
    if (!publicFiles.includes(file)) throw new Error(`Missing required image: ${file}`);
  }

  const generatedAsset = /^assets\/[A-Za-z0-9_-]+-[A-Za-z0-9_-]+\.(?:js|css)$/;
  const allowedDist = file => file === 'index.html' || generatedAsset.test(file) || published.includes(file);
  const unexpectedDist = filesIn(distDirectory).filter(file => !allowedDist(file));
  if (unexpectedDist.length) throw new Error(`Unexpected build files: ${unexpectedDist.join(', ')}`);
  mkdirSync(join(distDirectory, 'images'), { recursive: true });
  filesIn(join(distDirectory, 'images'));
  for (const file of published) copyFileSync(join(publicDirectory, file), join(distDirectory, file));

  const files = filesIn(distDirectory);
  const html = readFileSync(join(distDirectory, 'index.html'), 'utf8');
  if (!/name="robots"\s+content="noindex, nofollow, noimageindex"/.test(html)) {
    throw new Error('Required noindex policy is missing.');
  }
  const csp = html.match(/<meta\s+http-equiv="Content-Security-Policy"\s+content="([^"]+)"\s*\/?\s*>/i);
  // Vite escapes apostrophes in generated HTML attributes as &#39;.
  if (!csp || csp[1].replace(/&#39;/g, "'") !== requiredCsp) {
    throw new Error('Required production CSP is missing or weakened.');
  }
  if (!/name="referrer"\s+content="no-referrer"/.test(html)) {
    throw new Error('Required referrer policy is missing.');
  }
  if (!files.some(file => generatedAsset.test(file) && file.endsWith('.js'))
      || !files.some(file => generatedAsset.test(file) && file.endsWith('.css'))) {
    throw new Error('Compiled JavaScript or CSS is missing.');
  }
  console.log(`Pages files verified: ${files.length} files, ${published.length} reviewed images.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  preparePages(resolve(dirname(fileURLToPath(import.meta.url)), '..'));
}
