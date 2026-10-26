import { pick, type Locale } from '@/lib/portfolio';

/** Only verified, complete source photographs belong in student project covers. */
export function StudioArtwork({ slug, locale }: { slug: string; locale: Locale }) {
  if (slug === 'ice-chamber') return <img src="/studio/ice-prototype.webp" alt={pick(locale, 'iceICL 杯盖与饮品的完整实物原型', 'Complete iceICL lid and drink prototype')} width={1500} height={2000} loading="lazy" />;
  if (slug === 'cocokeep') return <div className="studio-product-pair">
    <img className="coco-closed" src="/studio/coco-closed.png" alt={pick(locale, 'Coco Carry 闭合状态实物原型', 'Coco Carry closed physical prototype')} width={470} height={816} loading="lazy" />
    <img className="coco-open" src="/studio/coco-open.png" alt={pick(locale, 'Coco Carry 打开后的储物结构原型', 'Coco Carry open storage prototype')} width={676} height={719} loading="lazy" />
  </div>;
  return null;
}
