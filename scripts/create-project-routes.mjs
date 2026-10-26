import { mkdir, rm, writeFile } from 'node:fs/promises';
import projects from '../lib/portfolio-data.json' with { type: 'json' };
for (const prefix of ['', 'en/']) {
  await rm(`app/${prefix}project/[slug]`, { recursive: true, force: true });
  for (const { slug } of projects) {
    const directory = `app/${prefix}project/${slug}`;
    await mkdir(directory, { recursive: true });
    await writeFile(`${directory}/page.tsx`, `import Case, { generateMetadata as caseMetadata } from '@/components/portfolio-case';
export const dynamic = 'force-static';
const props = { params: Promise.resolve({ slug: '${slug}' }), searchParams: Promise.resolve({ lang: '${prefix ? 'en' : 'zh'}' }) };
export function generateMetadata() { return caseMetadata(props); }
export default function Page() { return Case(props); }
`);
  }
}
