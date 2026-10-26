import { readdir, readFile, writeFile, cp, mkdir, rename, rm } from 'node:fs/promises';
import path from 'node:path';
const base = process.env.NEXT_PUBLIC_PAGES_BASE_PATH || '';
// Original portfolio bitmap and CSS URLs are root-relative; keep them in the Pages project path.
async function prepare(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) await prepare(file);
    else if (/\.(html|css|js|json|rsc|txt)$/.test(entry.name)) {
      const original = await readFile(file, 'utf8');
      const updated = original.replace(/(?<![\w/-])\/(source-media|frame-assets|current|cutouts|projects|research|summer|fonts|atmosphere|assets|_next)(?=\/)/g, `${base}/$1`)
        .replace(/(?<![\w/-])\/(favicon\.svg|og\.png)(?=["'\\\s<])/g, `${base}/$1`);
      if (updated !== original) await writeFile(file, updated);
    }
  }
}
await rm('out', { recursive: true, force: true });
await cp('dist/client', 'out', { recursive: true });
await prepare('out');
async function directoryRoutes(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) await directoryRoutes(file);
    else if (entry.name.endsWith('.html') && !['index.html','404.html'].includes(entry.name)) {
      const destination = file.slice(0, -5);
      await mkdir(destination, { recursive: true });
      await rename(file, path.join(destination, 'index.html'));
    }
  }
}
await directoryRoutes('out');
await writeFile('out/.nojekyll', '');
