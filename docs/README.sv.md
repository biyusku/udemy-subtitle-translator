# 🎓 Udemy Live Undertextöversättare

<div align="center">

![Chrome-tillägg](https://img.shields.io/badge/Chrome-Extension-4285F4?logo=googlechrome&logoColor=white)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-orange)
![Licens: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![Version](https://img.shields.io/badge/version-0.2.0-blue)

**Översätt Udemy-undertexter och transkriptioner till vilket språk som helst — live, direkt på videon.**

[← Huvud-README](../README.md)

</div>

---

## 📸 Skärmdumpar

<div align="center">

| Första inställning | Inställningspanel |
|:---:|:---:|
| ![Inställning](../screenshots/popup-onboarding.png) | ![Inställningar](../screenshots/popup-settings.png) |

</div>

---

## ✨ Funktioner

- 🌍 **Flerspråkigt stöd** — välj bland förinställda språk eller ange en ISO/BCP47-kod
- 🧠 **Smart källdetektering** — läser från `video.textTracks`, undertextens DOM eller transkriptionspanelen
- 🖥️ **Helskärmsredo** — transkriptionscachen håller översättningar aktiva
- 👁️ **Dölj originalundertexter** — visa bara det översatta lagret
- ⚡ **Översättningscache** — upprepade rader serveras direkt
- 🔌 **Två leverantörer** — Google GTX (ingen konfiguration) eller din egen LibreTranslate-server
- 🎯 **Förstastartsguide** — en fråga för att ställa in standardspråk
- 🛠️ **Inget byggsteg** — ren JS, laddas direkt

---

## 🚀 Installation

### Utvecklarläge (manuellt)

1. Klona eller ladda ner detta arkiv som ZIP
2. Öppna **`chrome://extensions`** i Chrome
3. Aktivera **Utvecklarläge** (övre högra hörnet)
4. Klicka på **Läs in okomprimerat tillägg**
5. Välj mappen **`extension/`**

> Chrome Web Store-version kommer snart.

---

## 🔧 Hur det fungerar

```
Udemy-föreläsningssida
       │
       ▼
 Innehållsskript  (content.js)
   Identifierar aktiv undertexttext
       │
       ▼
 Bakgrundsarbetare  (background.js)
   Översätter via vald leverantör
   Cachar upprepade rader
       │
       ▼
 Lager läggs till ovanpå videon
```

---

## 🌐 Översättningsleverantörer

| Leverantör | Inställning | Anteckningar |
|---|---|---|
| **Google GTX** | Ingen | Standard. Ingen API-nyckel krävs. |
| **LibreTranslate** | Endpoint-URL | Egen eller offentlig server. Full integritetskontroll. |

---

## 🎛️ Användning

1. Gå till valfri Udemy-föreläsningssida
2. Klicka på tilläggsikonen
3. Vid första start — välj ditt språk
4. Aktivera undertexter på videon eller öppna transkriptionspanelen
5. Håll **Tillägget aktiverat**
6. Översatta undertexter visas ovanpå videon

---

## ⚠️ Begränsningar

- Fungerar bara med kurser som redan har undertexter eller transkription
- Gör ingen realtidsomvandling av tal till text
- Översättningskvaliteten beror på leverantör och språkpar

---

## 🔒 Integritet

Detta tillägg kan skicka undertexttext till den valda leverantören. Inga webbläsarhistorik, personliga uppgifter eller Udemy-inloggningsuppgifter samlas in.

Läs [PRIVACY.md](../PRIVACY.md) för fullständiga detaljer.

---

## 📄 Licens

[MIT](../LICENSE) © 2026