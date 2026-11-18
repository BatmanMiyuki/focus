import * as Notifications from 'expo-notifications';
import { AppState } from './types'; import { todayKey } from './dates'; import { tasksFor, calcStreak } from './streak';

// Appel au démarrage : affiche les notifs même si l'app est fermée
Notifications.setNotificationHandler({ handleNotification: async()=>({ shouldShowAlert:true, shouldPlaySound:true, shouldSetBadge:false }) });

export async function requestPermission(){ const {status}=await Notifications.requestPermissionsAsync(); return status==='granted'; }

function parseTime(t:string){ const [h,m]=t.split(':').map(Number); return {h,m}; }

// Rappel du matin : "🔥 Ta focus t'attend — X tâches"
export async function scheduleMorning(state:AppState){
  await Notifications.cancelScheduledNotificationAsync('morning');
  const {h,m}=parseTime(state.settings.morning);
  const n=tasksFor(state.tasks,todayKey()).length;
  await Notifications.scheduleNotificationAsync({ identifier:'morning', content:{ title:'🔥 Ta focus t\'attend', body: n? `${n} tâche(s) aujourd'hui. C'est parti !` : 'Ajoute tes tâches du jour.' }, trigger:{ hour:h, minute:m, repeats:true } });
}

// Contrôle du soir : lit les tâches du jour, notifie seulement si incomplet
export async function scheduleEveningCheck(state:AppState){
  await Notifications.cancelScheduledNotificationAsync('evening');
  const {h,m}=parseTime(state.settings.evening);
  await Notifications.scheduleNotificationAsync({ identifier:'evening', content:{ title:'⚠️ Ta focus est en danger !', body:'Il te reste des tâches avant minuit. Ne casse pas la chaîne !' }, trigger:{ hour:h, minute:m, repeats:true } });
  // NOTE avancée : pour un contrôle 100% fiable (notifier "🎉 Jour validé" si tout est fait),
  // utilise une tâche de fond (expo-background-task / TaskManager) qui lit AsyncStorage à 21h
  // et envoie la notif adaptée. Le squelette est dans README.md.
}

export async function rescheduleAll(state:AppState){ if(!state.settings.notif) return; await scheduleMorning(state); await scheduleEveningCheck(state); }
export async function testNotification(){ await Notifications.scheduleNotificationAsync({ content:{ title:'🔥 Test — Ta focus t\'attend', body:'Les notifications fonctionnent !' }, trigger:null }); }
