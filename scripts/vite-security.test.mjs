import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import net from 'node:net';
import { tmpdir } from 'node:os';
import { join, resolve, sep } from 'node:path';
import test from 'node:test';
import { createServer } from 'vite';

test('Vite denies .env reads, including raw query variants (GHSA-8g5g-mxqh-grgj)', async () => {
  // Use only a synthetic fixture outside the application, never real credentials.
  const root = mkdtempSync(join(tmpdir(), '168works-vite-test-'));
  const marker = '168WORKS_SYNTHETIC_TEST_NOT_A_SECRET';
  let server;
  try {
    mkdirSync(join(root, 'src'));
    writeFileSync(join(root, 'src/.env'), 'SYNTHETIC_MARKER=' + marker);
    const allocator = net.createServer();
    await new Promise((resolve, reject) => {
      allocator.once('error', reject);
      allocator.listen(0, '127.0.0.1', resolve);
    });
    const port = allocator.address().port;
    await new Promise((resolve, reject) => allocator.close(error => error ? reject(error) : resolve()));
    server = await createServer({
      root, configFile: false, envFile: false, base: '/168works/', logLevel: 'silent',
      server: { host: '127.0.0.1', port, strictPort: true },
    });
    await server.listen();
    assert.equal(server.httpServer.address().address, '127.0.0.1');
    for (const query of ['', '?raw', '?import&raw']) {
      const response = await fetch(`http://127.0.0.1:${port}/168works/src/.env${query}`, {
        signal: AbortSignal.timeout(10000),
      });
      const body = await response.text();
      assert.equal(response.status, 403, `Expected denial for .env${query}`);
      assert.equal(body.includes(marker), false, 'Synthetic content must never be returned');
    }
  } finally {
    await server?.close();
    if (!resolve(root).startsWith(resolve(tmpdir()) + sep + '168works-vite-test-')) {
      throw new Error('Invalid temporary cleanup directory');
    }
    rmSync(root, { recursive: true, force: true });
  }
});
