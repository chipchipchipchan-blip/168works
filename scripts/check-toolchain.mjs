import { readFileSync } from 'node:fs';

const [major, minor, patch] = process.versions.node.split('.').map(Number);
const minimum = { 22: [23, 4], 24: [22, 1] }[major];
if (!minimum || minor < minimum[0] || (minor === minimum[0] && patch < minimum[1])) {
  throw new Error('Node.js 24.22.1以降の24系（または22.23.4以降の22系）が必要です。READMEの起動手順を確認してください。');
}

const vite = JSON.parse(readFileSync(new URL('../node_modules/vite/package.json', import.meta.url), 'utf8'));
const [viteMajor, viteMinor, vitePatch] = vite.version.split('.').map(Number);
// GHSA-8g5g-mxqh-grgj: the Vite 6 fix starts at 6.4.5.
// Review this guard together with the application before changing major versions.
if (viteMajor !== 6 || viteMinor < 4 || (viteMinor === 4 && vitePatch < 5)) {
  throw new Error('Vite 6.4.5以降の6系が必要です。lockfileを確認してnpm ciを実行してください。');
}
console.log(`Toolchain OK: Node.js ${process.versions.node}, Vite ${vite.version}`);
