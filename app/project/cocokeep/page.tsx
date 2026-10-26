import Case, { generateMetadata as caseMetadata } from '@/components/portfolio-case';
export const dynamic = 'force-static';
const props = { params: Promise.resolve({ slug: 'cocokeep' }), searchParams: Promise.resolve({ lang: 'zh' }) };
export function generateMetadata() { return caseMetadata(props); }
export default function Page() { return Case(props); }
