import { Stack } from 'expo-router'; import { useEffect } from 'react'; import { loadState } from '../lib/storage'; import { rescheduleAll } from '../lib/notifications';
export default function Root(){ useEffect(()=>{ loadState().then(s=>rescheduleAll(s)); },[]); return <Stack screenOptions={{headerShown:false}}/>; }
