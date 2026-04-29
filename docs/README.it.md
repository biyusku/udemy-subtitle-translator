# 🎓 Traduttore di Sottotitoli Live per Udemy

<div align="center">

![Estensione Chrome](https://img.shields.io/badge/Chrome-Extension-4285F4?logo=googlechrome&logoColor=white)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-orange)
![Licenza: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![Versione](https://img.shields.io/badge/version-0.2.0-blue)

**Traduci i sottotitoli e le trascrizioni di Udemy in qualsiasi lingua — in tempo reale, sopra il video.**

[← README principale](../README.md)

</div>

---

## 📸 Screenshot

<div align="center">

| Configurazione iniziale | Pannello impostazioni |
|:---:|:---:|
| ![Configurazione](../screenshots/popup-onboarding.png) | ![Impostazioni](../screenshots/popup-settings.png) |

</div>

---

## ✨ Funzionalità

- 🌍 **Supporto multilingue** — scegli tra le lingue predefinite o inserisci qualsiasi codice ISO/BCP47
- 🧠 **Rilevamento intelligente della sorgente** — legge da `video.textTracks`, DOM dei sottotitoli o pannello trascrizione
- 🖥️ **Pronto per il fullscreen** — la cache della trascrizione mantiene le traduzioni attive
- 👁️ **Nascondi i sottotitoli originali** — mostra solo il livello tradotto
- ⚡ **Cache delle traduzioni** — le righe ripetute vengono servite istantaneamente
- 🔌 **Due provider** — Google GTX (senza configurazione) o il tuo server LibreTranslate
- 🎯 **Procedura guidata al primo avvio** — una domanda per impostare la lingua predefinita
- 🛠️ **Nessun passaggio di build** — JS puro, caricato direttamente

---

## 🚀 Installazione

### Modalità sviluppatore (manuale)

1. Clona o scarica questo repository come ZIP
2. Apri **`chrome://extensions`** in Chrome
3. Attiva la **Modalità sviluppatore** (in alto a destra)
4. Clicca su **Carica estensione non compressa**
5. Seleziona la cartella **`extension/`**

> Versione Chrome Web Store in arrivo.

---

## 🔧 Come funziona

```
Pagina del corso Udemy
       │
       ▼
 Script di contenuto  (content.js)
   Rileva il testo del sottotitolo attivo
       │
       ▼
 Worker in background  (background.js)
   Traduce tramite il provider selezionato
   Memorizza nella cache le righe ripetute
       │
       ▼
 Overlay aggiunto sopra il video
```

1. Lo script monitora i sottotitoli attivi sulla pagina.
2. Ogni nuova riga viene inviata al service worker in background.
3. Il worker traduce il testo e memorizza il risultato.
4. Il sottotitolo tradotto viene mostrato direttamente sopra il video.

---

## 🌐 Provider di traduzione

| Provider | Configurazione | Note |
|---|---|---|
| **Google GTX** | Nessuna | Predefinito. Nessuna chiave API richiesta. |
| **LibreTranslate** | URL endpoint | Server personale o pubblico. Controllo completo della privacy. |

---

## 🎛️ Utilizzo

1. Vai a qualsiasi pagina di corso Udemy
2. Clicca sull'icona dell'estensione
3. Al primo avvio — scegli la tua lingua
4. Attiva i sottotitoli sul video o apri il pannello trascrizione
5. Mantieni **Estensione attivata**
6. I sottotitoli tradotti appaiono sopra il video

---

## ⚠️ Limitazioni

- Funziona solo con corsi che hanno già sottotitoli o una trascrizione
- Non esegue conversione vocale in tempo reale
- La qualità della traduzione dipende dal provider e dalla coppia di lingue

---

## 🔒 Privacy

Questa estensione può inviare il testo dei sottotitoli al provider selezionato. Non vengono raccolti cronologia di navigazione, dati personali o credenziali Udemy.

Leggi [PRIVACY.md](../PRIVACY.md) per i dettagli completi.

---

## 📄 Licenza

[MIT](../LICENSE) © 2026