import { AppState } from './types'; import { todayKey } from './dates'; import { calcStreak, tasksFor } from './streak';
// Données partagées avec le widget (Android: react-native-android-widget, iOS: expo-widgets)
export function widgetPayload(state:AppState){
  const tk=todayKey(); const list=tasksFor(state.tasks,tk);
  return { streak:calcStreak(state.tasks), best:state.best, total:list.length, done:list.filter(t=>t.done[tk]).length, tasks:list.slice(0,4).map(t=>({title:t.title, done:!!t.done[tk]})) };
}
