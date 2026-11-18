// Sélecteur d'heure : utilise @react-native-community/datetimepicker en prod (DateTimePicker mode="time").
import { TextInput } from 'react-native';
export default function TimeWheel({value,onChange}:{value:string;onChange:(v:string)=>void}){ return <TextInput value={value} onChangeText={onChange} placeholder="08:00" style={{backgroundColor:'#0F1114',color:'#fff',padding:12,borderRadius:12}}/>; }
