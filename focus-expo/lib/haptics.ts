import * as Haptics from 'expo-haptics';
export const buzzSuccess=()=>Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
export const buzzTap=()=>Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
