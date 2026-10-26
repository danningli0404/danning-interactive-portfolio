import assert from 'node:assert/strict';
import test from 'node:test';
import {readFile,readdir,access} from 'node:fs/promises';
import path from 'node:path';
import projects from '../lib/portfolio-data.json' with {type:'json'};
const base='/danning-interactive-portfolio';
const decode=s=>s.replaceAll('&amp;','&').replaceAll('&#x27;',"'").replaceAll('&quot;','"');
test('18 bilingual pages retain current content and locale-specific contacts',async()=>{
 assert.equal(projects.length,8);assert.equal(projects.filter(p=>p.student).length,3);
 for(const l of ['zh','en']){
  const prefix=l==='en'?'/en':'';const home=decode(await readFile(`out${prefix}/index.html`,'utf8'));
  const email=l==='zh'?'13904958988@163.com':'danning_li@brown.edu';
  assert.ok(home.includes(`mailto:${email}`));assert.ok(home.includes('folio-home'));
  for(const p of projects){
   const html=decode(await readFile(`out${prefix}/project/${p.slug}/index.html`,'utf8'));
   assert.ok(html.includes(p.summary[l]),`${l}/${p.slug}: latest summary`);
   if(p.student)assert.ok(html.includes(p.contribution[l]),`${l}/${p.slug}: confirmed contribution`);
   if(!p.student && p.slug!=='color-showdown'){assert.ok(html.includes(`faithful-page faithful-${p.slug}`));assert.ok((html.match(/<p[ >]/g)||[]).length>6);}
   assert.ok(home.includes(`${base}${prefix}/project/${p.slug}`));assert.ok(html.includes(`mailto:${email}`));
   for(const alt of ['','/en'])assert.ok(html.includes(`href="${base}${alt}/project/${p.slug}#top"`));
  }
 }
});
test('all local links, images and scripts resolve under the GitHub Pages subdirectory',async()=>{
 async function walk(dir){for(const e of await readdir(dir,{withFileTypes:true})){
  const f=path.join(dir,e.name);if(e.isDirectory())await walk(f);else if(e.name.endsWith('.html')){
   const html=await readFile(f,'utf8');for(const m of html.matchAll(/(?:href|src)="([^"]+)"/g)){
    if(!m[1].startsWith(base+'/'))continue;
    const p=decodeURIComponent(new URL(m[1],'https://example.org').pathname.slice(base.length+1));
    try{await access(path.join('out',p));}catch{assert.fail(`${f}: missing ${p}`);}
   }
   assert.doesNotMatch(html,/href="\/(current|project|en|research|fonts)\//);
  }
 }}await walk('out');
});
test('current PNGs ground the four main cases; unfinished work stays in progress',()=>{
 for(const p of projects.slice(0,4)){assert.ok(p.cover.startsWith('/figma/'));for(const s of p.sections)for(const image of s.images)assert.ok(image.startsWith('/current/'));}
 assert.equal(projects.find(p=>p.slug==='headphone-comfort').progress,true);
 assert.ok(projects.find(p=>p.slug==='tacchat').role.zh.includes('第二作者'));
 assert.ok(projects.find(p=>p.slug==='ice-chamber').contribution.zh.includes('主导用户访谈与测试'));
});


test('restored figures keep device frames, annotations and student-page endings',async()=>{
 for(const prefix of ['', '/en']){
  for(const p of projects.filter(p=>p.student)){
   const html=await readFile(`out${prefix}/project/${p.slug}/index.html`,'utf8');
   assert.doesNotMatch(html,/class="case-next"/,`${prefix}/${p.slug}: no unrelated next project`);
  }
  const vital=await readFile(`out${prefix}/project/vitalride/index.html`,'utf8');
  assert.equal((vital.match(/class="phone-shell"/g)||[]).length,9,'all nine native phone frames remain');
  assert.ok(vital.includes(prefix ? 'Sensor tests, readings and annotations' : '传感器测试、数据与标注'));
  assert.ok(vital.includes(prefix ? 'Rider use-scenario storyboard' : '骑手使用场景故事板'));
  const pure=await readFile(`out${prefix}/project/purelink/index.html`,'utf8');
  for(const label of prefix ? ['TDS sensor','Turbidity sensor','UV lamp'] : ['TDS 传感器','浊度传感器','紫外线灯'])assert.ok(pure.includes(label));
  assert.ok(pure.includes('restored-pure/'));
 }
});
