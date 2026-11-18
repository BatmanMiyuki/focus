// Lance une confetti quand le jour est validé. Remplace par 'react-native-confetti-cannon' en prod.
import { useEffect, useRef } from 'react'; import { Animated, View } from 'react-native';
export default function Confetti({show}:{show:boolean}){ const y=useRef(new Animated.Value(-20)).current; useEffect(()=>{ if(show){ y.setValue(-20); Animated.timing(y,{toValue:800,duration:1800,useNativeDriver:true}).start(); } },[show]); if(!show) return null; return <Animated.View style={{position:'absolute',top:y,left:'50%',width:10,height:14,backgroundColor:'#FFB800',borderRadius:2}}/>; }
