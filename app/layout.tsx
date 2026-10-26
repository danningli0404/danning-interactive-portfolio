import type { Metadata } from 'next';
import './globals.css';
import './portfolio.css';
import './faithful.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://danningli0404.github.io/danning-interactive-portfolio'),
  title: '李丹宁 Danning Li — 设计工程',
  icons: { icon: '/favicon.svg' },
  description: '李丹宁的体验设计、用户研究与产品设计作品集。以真实用户需求为起点，通过研究、设计和原型迭代回应日常问题。',
  openGraph: { title: 'Danning Li 李丹宁 — Design Engineer', description: 'Experience design, user research, and physical prototyping by Danning Li.', images: ['/og.png'] },
  twitter: { card: 'summary_large_image', title: 'Danning Li 李丹宁 — Design Engineer', description: 'Product design and physical making for everyday life.', images: ['/og.png'] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
