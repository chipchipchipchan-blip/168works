import { readdirSync, unlinkSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

// Vite が public からコピーした制作メモは、公開用の dist からだけ除外します。
// public 内の原本や画像は変更しません。
const imagesDirectory = fileURLToPath(new URL('../dist/images/', import.meta.url));
for (const entry of readdirSync(imagesDirectory, { withFileTypes: true })) {
  if (entry.isFile() && (/\.md$/i.test(entry.name) || entry.name === '.gitkeep')) {
    unlinkSync(join(imagesDirectory, entry.name));
  }
}
