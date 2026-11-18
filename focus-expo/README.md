# 🔥 Focus — App de discipline quotidienne (Expo)

App React Native : streak +1/jour si toutes les tâches sont faites, notifications locales sur l'appareil, widget écran d'accueil.

## Lancer
```bash
npm install
npx expo start
```
Scanne le QR avec **Expo Go** (Android/iOS). Pour les notifications + widget natif, il faut un **build dev** (Expo Go limite les widgets) :
```bash
npx expo prebuild
eas build --profile development --platform android
```

## Notifications (même app fermée / téléphone éteint)
- `lib/notifications.ts` : `expo-notifications`, rappels quotidiens répétés (matin + soir).
- Le contrôle du soir lit les tâches du jour : si incomplètes → alerte « ta focus est en danger ».
- Pour une version 100% fiable (notifier « 🎉 Jour validé » si tout est fait), ajoute une **tâche de fond** (`expo-background-task` + `expo-task-manager`) qui lit AsyncStorage à 21h et envoie la notif adaptée.

## Widget
- **Android** : `react-native-android-widget` — 3 tailles (petit = streak, moyen = tâches, grand = streak + tâches + %). Données via `lib/widgetData.ts`.
- **iOS** : `expo-widgets` (WidgetKit) — même payload.
- Le widget se rafraîchit à chaque validation de tâche (appelle `widgetPayload(state)` puis `updateWidget`).

## Streak
`lib/streak.ts` : +1 si 100% des tâches du jour sont cochées avant minuit, sinon reset à 0 le lendemain. Record conservé.

## Structure
```
app/          écrans (expo-router)
components/   TaskRow, Heatmap, BarsChart, ProgressRing, Confetti, TaskFormModal…
lib/          dates, streak, storage, notifications, widgetData, haptics, theme, types
```
