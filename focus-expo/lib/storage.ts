import AsyncStorage from '@react-native-async-storage/async-storage'; import { AppState } from './types';
const KEY='focus-v1';
export const emptyState:AppState={tasks:[],goals:[],best:0,settings:{notif:false,morning:'08:00',evening:'21:00'}};
export async function loadState():Promise<AppState>{ try{ const r=await AsyncStorage.getItem(KEY); return r?JSON.parse(r):emptyState; }catch{ return emptyState; } }
export async function saveState(s:AppState){ try{ await AsyncStorage.setItem(KEY,JSON.stringify(s)); }catch{} }
