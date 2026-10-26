import assert from 'node:assert/strict';
import test from 'node:test';
import {access} from 'node:fs/promises';
import projects from '../lib/portfolio-data.json' with {type:'json'};
test('all cases have bilingual current copy and available imagery',async()=>{
 for(const p of projects){
  for(const field of ['summary','role','contribution','category']){assert.match(p[field].zh,/\p{Script=Han}/u);assert.ok(p[field].en.length>10);}
  assert.ok(p.sections.length>=3);
  for(const s of p.sections){assert.ok(s.body.zh.length>30);assert.ok(s.body.en.length>50);for(const img of s.images)await access(`public${img}`);}
  if(p.cover)await access(`public${p.cover}`);
 }
});
