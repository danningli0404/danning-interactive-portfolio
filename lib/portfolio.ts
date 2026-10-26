import data from './portfolio-data.json';
export type Locale = 'zh' | 'en';
export type Pair = Record<Locale, string>;
export type PortfolioProject = {slug:string;title:string;theme:string;category:Pair;summary:Pair;period:string;role:Pair;tools:string[];cover:string|null;sections:{title:Pair;body:Pair;images:string[]}[];contribution:Pair;student:boolean;progress:boolean;demo?:string;updating?:boolean};
export const portfolio = data as PortfolioProject[];
export const emailFor = (locale:Locale) => locale === 'zh' ? '13904958988@163.com' : 'danning_li@brown.edu';
export const pick = (locale:Locale, zh:string, en:string) => locale === 'zh' ? zh : en;
