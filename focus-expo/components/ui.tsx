import { Text } from 'react-native'; import { colors } from '../lib/theme';
export const H1=({children}:any)=><Text style={{color:colors.text,fontSize:22,fontWeight:'900'}}>{children}</Text>;
export const Muted=({children}:any)=><Text style={{color:colors.muted,fontSize:13,lineHeight:19}}>{children}</Text>;
