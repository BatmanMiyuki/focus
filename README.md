# 🔵 Focus

**Ta discipline quotidienne.** Une série qui grandit chaque jour où tu termines tout.

App web mobile (PWA) — un seul écran, pensé pour le téléphone, installable sur l'écran d'accueil.

👉 **https://batmanmiyuki.github.io/focus/**

---

## Ce que fait Focus

| | |
|---|---|
| 🔥 **Série** | +1 jour **uniquement** si 100 % des tâches du jour sont cochées avant minuit. Une journée ratée → la série retombe à 0. Le record reste affiché. |
| ✅ **Tâches du jour** | Ajout en 3 champs (intitulé, heure, catégorie), rituels express en un tap, coche animée, suppression. |
| 🔔 **Rappels** | Rappel du matin + bilan du soir qui **lit tes tâches** : tout fait → « Journée validée », sinon → « Ta série est en danger ». |
| 📊 **Stats** | Taux sur 7 jours, jours validés, graphique 7 jours, heatmap des 12 dernières semaines. |
| 📱 **Widget / PWA** | Installable en plein écran, fonctionne hors ligne (service worker). Aperçu de widget dans les Réglages. |

## Installation sur ton téléphone

**iPhone (Safari)** — ouvre le lien → bouton **Partager** → **Sur l'écran d'accueil**.
**Android (Chrome)** — ouvre le lien → menu **⋮** → **Installer l'application** (ou « Ajouter à l'écran d'accueil »).

L'app s'ouvre ensuite en plein écran, sans barre d'URL, comme une app native.

## Notifications

Les rappels utilisent l'API `Notification` du navigateur : autorise-les dans **Réglages → Notifications**.

> ⚠️ Sur le web, un rappel ne peut être déclenché par le système que si l'app a été ouverte récemment (limite des navigateurs mobiles, surtout iOS). Pour des notifications **100 % garanties, même app fermée**, il faut la version native Expo (`focus-expo/`) qui programme les rappels en local avec `expo-notifications` — voir son README.

## Structure

```
index.html              # l'app complète (HTML + CSS + JS, zéro dépendance)
manifest.webmanifest    # installation PWA
sw.js                   # cache hors ligne
icon-*.png              # icônes
focus-expo/             # projet Expo / React Native (notifications natives + widget)
```

## Développement

Aucun build, aucune dépendance :

```bash
python3 -m http.server 8000   # puis http://localhost:8000
```

Les données sont stockées en local dans `localStorage` (clé `focus-v1`), jamais envoyées à un serveur.

---

Fait avec ❤️ — *une tâche, un jour, une série.*
