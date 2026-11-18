import { Task } from './types'; import { todayKey, addDays } from './dates';
export function tasksFor(tasks:Task[], dateKey:string){ return tasks.filter(t=>t.created<=dateKey); }
export function isComplete(tasks:Task[], dateKey:string){ const l=tasksFor(tasks,dateKey); return l.length>0 && l.every(t=>t.done[dateKey]); }
export function calcStreak(tasks:Task[]){ let s=0; let c=todayKey(); if(!isComplete(tasks,c)) c=addDays(c,-1); while(isComplete(tasks,c)){ s++; c=addDays(c,-1); if(s>365) break; } return s; }
export function completion(tasks:Task[], dateKey:string){ const l=tasksFor(tasks,dateKey); if(!l.length) return 0; return Math.round(l.filter(t=>t.done[dateKey]).length/l.length*100); }
