import {caseReading,type ReadingSlug} from '@/lib/case-reading';
import {pick,type Locale} from '@/lib/portfolio';
export function CaseReadingOverview({slug,locale}:{slug:ReadingSlug;locale:Locale}){
 const entry=caseReading[slug];const t=(zh:string,en:string)=>pick(locale,zh,en);
 const fields=[['problem',t('设计问题','Design problem')],['role',t('我的工作','My contribution')],['solution',t('设计方案','Design approach')],['evidence',t('产出与验证','Outcomes and validation')]] as const;
 return <section className="case-reading-overview" aria-labelledby={`${slug}-overview-title`}>
  <h2 id={`${slug}-overview-title`}>{t('项目概览','Project at a glance')}</h2>
  <dl>{fields.map(([key,label])=><div key={key}><dt>{label}</dt><dd>{entry[key][locale]}</dd></div>)}</dl>
  <nav aria-label={t('项目章节','Project chapters')}>{entry.sections.filter(s=>s.nav!==false).map((s,i)=><a key={s.id} href={`#${s.id}`}><span aria-hidden="true">{String(i+1).padStart(2,'0')}</span>{s.title[locale]}<span aria-hidden="true">↘</span></a>)}</nav>
 </section>;
}
export function CaseSectionHeading({slug,sectionId,locale}:{slug:ReadingSlug;sectionId:string;locale:Locale}){
 const section=caseReading[slug].sections.find(s=>s.id===sectionId);
 if(!section)return null;
 return <h2 id={`${sectionId}-title`} className="faithful-section-title">{section.title[locale]}</h2>;
}
