# 🎓 Traducător de Subtitrări Live pentru Udemy

<div align="center">

![Extensie Chrome](https://img.shields.io/badge/Chrome-Extension-4285F4?logo=googlechrome&logoColor=white)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-orange)
![Licență: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![Versiune](https://img.shields.io/badge/version-0.2.0-blue)

**Traduce subtitrările și transcrierile Udemy în orice limbă — în timp real, direct pe video.**

[← README principal](../README.md)

</div>

---

## 📸 Capturi de ecran

<div align="center">

| Configurare inițială | Panoul de setări |
|:---:|:---:|
| ![Configurare](../screenshots/popup-onboarding.png) | ![Setări](../screenshots/popup-settings.png) |

</div>

---

## ✨ Funcționalități

- 🌍 **Suport multilingv** — alege din limbi predefinite sau introdu orice cod ISO/BCP47
- 🧠 **Detectare inteligentă a sursei** — citește din `video.textTracks`, DOM-ul subtitrărilor sau panoul de transcriere
- 🖥️ **Pregătit pentru ecran complet** — memoria cache menține traducerile active
- 👁️ **Ascunde subtitrările originale** — afișează doar stratul tradus
- ⚡ **Cache traduceri** — liniile repetate sunt servite instantaneu
- 🔌 **Doi furnizori** — Google GTX (fără configurare) sau propriul server LibreTranslate
- 🎯 **Expert de primă rulare** — o întrebare pentru setarea limbii implicite
- 🛠️ **Fără pas de compilare** — JS pur, încărcat direct

---

## 🚀 Instalare

### Modul dezvoltator (manual)

1. Clonează sau descarcă acest depozit ca ZIP
2. Deschide **`chrome://extensions`** în Chrome
3. Activează **Modul dezvoltator** (colțul din dreapta sus)
4. Apasă **Încarcă extensie neîmpachetată**
5. Selectează folderul **`extension/`**

> Versiunea Chrome Web Store în curând.

---

## 🔧 Cum funcționează

```
Pagina cursului Udemy
       │
       ▼
 Script de conținut  (content.js)
   Detectează textul subtitrării active
       │
       ▼
 Worker de fundal  (background.js)
   Traduce prin furnizorul selectat
   Stochează liniile repetate în cache
       │
       ▼
 Strat adăugat peste video
```

---

## 🌐 Furnizori de traducere

| Furnizor | Configurare | Note |
|---|---|---|
| **Google GTX** | Niciuna | Implicit. Fără cheie API. |
| **LibreTranslate** | URL endpoint | Server propriu sau public. Control total al confidențialității. |

---

## 🎛️ Utilizare

1. Accesează orice pagină de curs Udemy
2. Apasă pe pictograma extensiei
3. La prima rulare — alege limba ta
4. Activează subtitrările la video sau deschide panoul de transcriere
5. Menține **Extensia activată**
6. Subtitrările traduse apar peste video

---

## ⚠️ Limitări

- Funcționează doar cu cursuri care au deja subtitrări sau transcriere
- Nu face conversie voce-text în timp real
- Calitatea traducerii depinde de furnizor și perechea de limbi

---

## 🔒 Confidențialitate

Această extensie poate trimite textul subtitrărilor la furnizorul selectat. Nu sunt colectate istoricul navigării, date personale sau credențiale Udemy.

Citește [PRIVACY.md](../PRIVACY.md) pentru detalii complete.

---

## 📄 Licență

[MIT](../LICENSE) © 2026