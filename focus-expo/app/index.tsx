import { useEffect, useState } from 'react'; import { View, Text, ScrollView, Pressable } from 'react-native';
import { loadState, saveState } from '../lib/storage'; import { calcStreak, tasksFor, isComplete } from '../lib/streak'; import { todayKey, fmtFr } from '../lib/dates';
import { colors } from '../lib/theme'; import TaskRow from '../components/TaskRow'; import TaskFormModal from '../components/TaskFormModal'; import { buzzSuccess } from '../lib/haptics'; import { AppState } from '../lib/types';

export default function Home(){
  const [state,setState]=useState<AppState|null>(null); const [showForm,setShowForm]=useState(false);
  useEffect(()=>{ loadState().then(s=>{ const st=calcStreak(s.tasks); if(st>s.best) s.best=st; setState(s); }); },[]);
  if(!state) return <View style={{flex:1,backgroundColor:colors.bg,alignItems:'center',justifyContent:'center'}}><Text style={{color:'#fff'}}>🔥 Chargement…</Text></View>;
  const tk=todayKey(), streak=calcStreak(state.tasks), list=tasksFor(state.tasks,tk);
  const update=(fn:(s:AppState)=>AppState)=>{ const n=fn(JSON.parse(JSON.stringify(state))); setState(n); saveState(n); };
  return (<ScrollView style={{flex:1,backgroundColor:colors.bg}} contentContainerStyle={{padding:16}}>
    <Text style={{color:colors.muted,textTransform:'capitalize'}}>{fmtFr(tk)}</Text>
    <View style={{backgroundColor:colors.orange,borderRadius:26,padding:20,marginTop:10}}>
      <Text style={{color:'#fff',fontSize:52,fontWeight:'900'}}>{streak} 🔥</Text>
      <Text style={{color:'#fff',fontWeight:'800',fontSize:17}}>jour{streak>1?'s':''} d'affilée</Text>
      <Text style={{color:'#fff',opacity:.9,marginTop:4}}>🏆 Record : {state.best} · Le premier jour est le plus important.</Text>
    </View>
    <Text style={{color:colors.text,fontWeight:'800',fontSize:16,marginTop:20,marginBottom:10}}>✅ Tâches du jour ({list.length})</Text>
    {list.length===0 ? <View style={{backgroundColor:colors.card,borderRadius:22,padding:24,alignItems:'center'}}><Text style={{fontSize:34}}>🔥</Text><Text style={{color:colors.text,fontWeight:'800',fontSize:17,marginTop:8}}>Crée ta première routine</Text><Text style={{color:colors.muted,textAlign:'center',marginTop:6}}>Les routines se répètent chaque jour. Fais-les toutes pour faire grandir ta focus.</Text></View>
    : list.map(t=><TaskRow key={t.id} task={t} onToggle={()=>{ const was=isComplete(state.tasks,tk); update(s=>{ const task=s.tasks.find(x=>x.id===t.id)!; if(task.done[tk]) delete task.done[tk]; else task.done[tk]=true; return s; }); if(!was) setTimeout(()=>{ if(isComplete(state.tasks,tk)){ buzzSuccess(); } },50); }} onDelete={()=>update(s=>{ s.tasks=s.tasks.filter(x=>x.id!==t.id); return s; })}/>)}
    <Pressable onPress={()=>setShowForm(true)} style={{backgroundColor:colors.orange,padding:15,borderRadius:16,alignItems:'center',marginTop:8}}><Text style={{color:'#fff',fontWeight:'900'}}>Commencer / + Ajouter une tâche</Text></Pressable>
    <TaskFormModal visible={showForm} onClose={()=>setShowForm(false)} onAdd={(title,time,cat)=>update(s=>{ s.tasks.push({id:Math.random().toString(36).slice(2,9),title,time,cat:cat as any,done:{},created:tk}); return s; })}/>
  </ScrollView>);
}
