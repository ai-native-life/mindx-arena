// mindx-arena build: default route -> dist/ root (via Pages _redirects rewrite),
// directory/ -> dist/directory/, each routes/<slug> -> dist/r/<slug>/,
// plus switcher widget + routes.json + canonical.
import { rmSync, mkdirSync, cpSync, existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(root, 'dist');
const arena = JSON.parse(readFileSync(path.join(root, 'arena.json'), 'utf8'));
const run = (cmd, cwd) => execSync(cmd, { cwd, stdio: 'inherit', shell: true });

rmSync(dist, { recursive: true, force: true });
mkdirSync(path.join(dist, 'r'), { recursive: true });

const routes = [];
for (const slug of readdirSync(path.join(root, 'routes'))) {
  const src = path.join(root, 'routes', slug);
  if (!existsSync(path.join(src, 'route.json'))) continue;
  const out = path.join(dist, 'r', slug);
  if (existsSync(path.join(src, 'package.json'))) {
    const base = slug === arena.defaultRoute ? `/r/${slug}/` : './';
    run('npm install --no-audit --no-fund', src);
    run(`npm run build -- --base=${base}`, src);
    cpSync(path.join(src, 'dist'), out, { recursive: true });
  } else {
    cpSync(src, out, { recursive: true });
  }
  const meta = JSON.parse(readFileSync(path.join(src, 'route.json'), 'utf8'));
  meta.slug = slug;
  routes.push(meta);
  console.log(`route ready: /r/${slug}/`);
}
routes.sort((a, b) => (a.no < b.no ? -1 : 1));

cpSync(path.join(root, 'directory'), path.join(dist, 'directory'), { recursive: true });
cpSync(path.join(root, 'switcher'), path.join(dist, '_arena'), { recursive: true });
const visible = routes.filter((r) => !r.hidden);
writeFileSync(path.join(dist, 'routes.json'), JSON.stringify({ default: arena.defaultRoute, routes: visible }, null, 2));

const lure = `/r/${arena.defaultRoute}/`;
writeFileSync(path.join(dist, '_redirects'), `/ ${lure} 200\n`);

const inject = '<link rel="stylesheet" href="/_arena/switcher.css">\n<script src="/_arena/switcher.js" defer></script>\n</body>';
const stamp = (f, extra) => {
  let h = readFileSync(f, 'utf8');
  if (!h.includes('</body>')) throw new Error('no </body> in ' + f);
  h = h.replace('</body>', inject);
  if (extra) h = h.replace('</head>', extra + '\n</head>');
  writeFileSync(f, h);
};
for (const r of routes) {
  stamp(
    path.join(dist, 'r', r.slug, 'index.html'),
    r.slug === arena.defaultRoute ? `<link rel="canonical" href="${arena.canonical}/">` : ''
  );
}
stamp(path.join(dist, 'directory', 'index.html'), '');
console.log('arena build complete -> dist/ (default: ' + lure + ')');
