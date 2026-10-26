import Case, { generateMetadata as caseMetadata } from '@/components/portfolio-case';
export const dynamic = 'force-static';
const props = { params: Promise.resolve({ slug: 'vitalride' }), searchParams: Promise.resolve({ lang: 'en' }) };
export function generateMetadata() { return caseMetadata(props); }
export default function Page() { return Case(props); }
