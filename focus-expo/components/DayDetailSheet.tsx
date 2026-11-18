// Bottom sheet : détail d'un jour (tâches faites / manquées). Utilise @gorhom/bottom-sheet en prod.
import { View, Text } from 'react-native'; import { colors } from '../lib/theme';
export default function DayDetailSheet({dateKey, tasks}:{dateKey:string; tasks:any[]}){ return <View style={{backgroundColor:colors.card,borderRadius:20,padding:16}}><Text style={{color:colors.text,fontWeight:'800'}}>{dateKey}</Text>{tasks.map(t=><Text key={t.id} style={{color:t.done[dateKey]?colors.green:colors.muted,marginTop:6}}>{t.done[dateKey]?'✓':'○'} {t.title}</Text>)}</View>; }
