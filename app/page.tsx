export const dynamic = 'force-static';
import Home, { generateMetadata as homeMetadata } from '@/components/portfolio-home';
const searchParams = Promise.resolve({ lang: 'zh' });
export function generateMetadata() { return homeMetadata({ searchParams }); }
export default function Page() { return Home({ searchParams }); }
