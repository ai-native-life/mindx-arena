// mindx-arena build: portal -> dist/, each routes/<slug> -> dist/r/<slug>/
// A route is either a static dir (copied) or a Vite app (has package.json -> install+build).
import { rmSync, mkdirSync, cpSync, existsSync, readdirSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, 'dist');
const run = (cmd, cwd) => execSync(cmd, { cwd, stdio: 'inherit', shell: true });

rmSync(dist, { recursive: true, force: true });
mkdirSync(path.join(dist, 'r'), { recursive: true });

cpSync(path.join(root, 'portal'), dist, { recursive: true });

for (const slug of readdirSync(path.join(root, 'routes'))) {
  const src = path.join(root, 'routes', slug);
  const out = path.join(dist, 'r', slug);
  if (existsSync(path.join(src, 'package.json'))) {
    run('npm install --no-audit --no-fund', src);
    run('npm run build', src);
    cpSync(path.join(src, 'dist'), out, { recursive: true });
  } else {
    cpSync(src, out, { recursive: true });
  }
  console.log(`route ready: /r/${slug}/`);
}
console.log('arena build complete -> dist/');
