export type Category = 'Sport'|'Santé'|'Mental'|'Travail'|'Perso';
export interface Task { id:string; title:string; time:string; cat:Category; done:Record<string,boolean>; created:string; }
export interface Goal { id:string; title:string; target:number; created:string; }
export interface AppState { tasks:Task[]; goals:Goal[]; best:number; settings:{notif:boolean; morning:string; evening:string}; }
