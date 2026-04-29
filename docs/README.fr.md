# 🎓 Traducteur de Sous-titres en Direct pour Udemy

<div align="center">

![Extension Chrome](https://img.shields.io/badge/Chrome-Extension-4285F4?logo=googlechrome&logoColor=white)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-orange)
![Licence : MIT](https://img.shields.io/badge/License-MIT-green.svg)
![Version](https://img.shields.io/badge/version-0.2.0-blue)

**Traduit les sous-titres et transcriptions Udemy dans n'importe quelle langue — en direct, par-dessus la vidéo.**

[← README principal](../README.md)

</div>

---

## 📸 Captures d'écran

<div align="center">

| Configuration initiale | Panneau de paramètres |
|:---:|:---:|
| ![Configuration](../screenshots/popup-onboarding.png) | ![Paramètres](../screenshots/popup-settings.png) |

</div>

---

## ✨ Fonctionnalités

- 🌍 **Support multilingue** — choisissez parmi des langues prédéfinies ou entrez un code ISO/BCP47 personnalisé
- 🧠 **Détection intelligente de la source** — lit depuis `video.textTracks`, le DOM des sous-titres ou le panneau de transcription
- 🖥️ **Prêt pour le plein écran** — le cache de transcription maintient les traductions actives
- 👁️ **Masquer les sous-titres originaux** — afficher uniquement la couche traduite
- ⚡ **Cache de traduction** — les lignes répétées sont servies instantanément
- 🔌 **Deux fournisseurs** — Google GTX (sans configuration) ou votre propre serveur LibreTranslate
- 🎯 **Assistant de premier lancement** — une question pour définir la langue par défaut
- 🛠️ **Aucune étape de build** — JS pur, chargé directement via `Load unpacked`

---

## 🚀 Installation

### Mode développeur (manuel)

1. Clonez ou téléchargez ce dépôt en ZIP
2. Ouvrez **`chrome://extensions`** dans Chrome
3. Activez le **Mode développeur** (en haut à droite)
4. Cliquez sur **Charger l'extension non empaquetée**
5. Sélectionnez le dossier **`extension/`**

> Version Chrome Web Store bientôt disponible.

---

## 🔧 Comment ça fonctionne

```
Page de cours Udemy
       │
       ▼
 Script de contenu  (content.js)
   Détecte le texte du sous-titre actif
       │
       ▼
 Worker en arrière-plan  (background.js)
   Traduit via le fournisseur sélectionné
   Met en cache les lignes répétées
       │
       ▼
 Couche superposée sur la vidéo
```

1. Le script surveille le sous-titre actif sur la page.
2. Chaque nouvelle ligne est envoyée au service worker.
3. Le worker traduit le texte et met le résultat en cache.
4. Le sous-titre traduit s'affiche directement sur la vidéo.

---

## 🌐 Fournisseurs de traduction

| Fournisseur | Configuration | Notes |
|---|---|---|
| **Google GTX** | Aucune | Par défaut. Pas de clé API requise. |
| **LibreTranslate** | URL de l'endpoint | Serveur personnel ou public. Contrôle total de la confidentialité. |

---

## 🎛️ Utilisation

1. Accédez à n'importe quelle page de cours Udemy
2. Cliquez sur l'icône de l'extension
3. Au premier lancement — choisissez votre langue
4. Activez les sous-titres ou ouvrez le panneau de transcription
5. Gardez **Extension activée**
6. Les sous-titres traduits apparaissent sur la vidéo

---

## ⚠️ Limitations

- Fonctionne uniquement avec les cours ayant des sous-titres ou une transcription
- Ne fait pas de conversion parole-texte en direct
- La qualité dépend du fournisseur et de la paire de langues

---

## 🔒 Confidentialité

Cette extension peut envoyer le texte des sous-titres au fournisseur sélectionné. Aucun historique de navigation, donnée personnelle ou identifiant Udemy n'est collecté.

Lisez [PRIVACY.md](../PRIVACY.md) pour plus de détails.

---

## 📄 Licence

[MIT](../LICENSE) © 2026