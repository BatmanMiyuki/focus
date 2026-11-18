export function todayKey(d=new Date()){ const y=d.getFullYear(), m=String(d.getMonth()+1).padStart(2,'0'), day=String(d.getDate()).padStart(2,'0'); return `${y}-${m}-${day}`; }
export function addDays(key:string,n:number){ const [y,m,d]=key.split('-').map(Number); const dt=new Date(y,m-1,d); dt.setDate(dt.getDate()+n); return todayKey(dt); }
export function fmtFr(key:string){ const [y,m,d]=key.split('-').map(Number); return new Date(y,m-1,d).toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long'}); }
