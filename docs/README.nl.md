# 🎓 Udemy Live Ondertitelvertaler

<div align="center">

![Chrome-extensie](https://img.shields.io/badge/Chrome-Extension-4285F4?logo=googlechrome&logoColor=white)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-orange)
![Licentie: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![Versie](https://img.shields.io/badge/version-0.2.0-blue)

**Vertaal Udemy-ondertitels en transcripties naar elke taal — live, bovenop de video.**

[← Hoofd-README](../README.md)

</div>

---

## 📸 Schermafbeeldingen

<div align="center">

| Eerste installatie | Instellingenpaneel |
|:---:|:---:|
| ![Installatie](../screenshots/popup-onboarding.png) | ![Instellingen](../screenshots/popup-settings.png) |

</div>

---

## ✨ Functies

- 🌍 **Meertalige ondersteuning** — kies uit vooringestelde talen of voer een ISO/BCP47-code in
- 🧠 **Slimme brondetectie** — leest van `video.textTracks`, ondertitel-DOM of transcriptiepaneel
- 🖥️ **Volledig scherm ondersteund** — transcriptiecache houdt vertalingen actief
- 👁️ **Originele ondertitels verbergen** — toon alleen de vertaalde overlay
- ⚡ **Vertaalcache** — herhaalde zinnen worden direct geserveerd
- 🔌 **Twee aanbieders** — Google GTX (geen instelling) of je eigen LibreTranslate-server
- 🎯 **Eerste start-assistent** — één vraag om de standaardtaal in te stellen
- 🛠️ **Geen buildstap** — puur JS, direct geladen via `Load unpacked`

---

## 🚀 Installatie

### Ontwikkelaarsmodus (handmatig)

1. Kloon of download deze repository als ZIP
2. Open **`chrome://extensions`** in Chrome
3. Zet **Ontwikkelaarsmodus** aan (rechtsboven)
4. Klik op **Niet-verpakte extensie laden**
5. Selecteer de map **`extension/`**

> Chrome Web Store-versie binnenkort beschikbaar.

---

## 🔧 Hoe het werkt

```
Udemy-lespage
       │
       ▼
 Inhoudsscript  (content.js)
   Detecteert actieve ondertiteltekst
       │
       ▼
 Achtergrondwerker  (background.js)
   Vertaalt via geselecteerde aanbieder
   Slaat herhaalde regels op in cache
       │
       ▼
 Overlay bovenop de video geplaatst
```

1. Het inhoudsscript monitort de actieve ondertitel op de pagina.
2. Elke nieuwe regel wordt naar de achtergrond-serviceworker gestuurd.
3. De worker vertaalt de tekst en slaat het resultaat op.
4. De vertaalde ondertitel verschijnt direct bovenop de video.

---

## 🌐 Vertalingsaanbieders

| Aanbieder | Instelling | Opmerkingen |
|---|---|---|
| **Google GTX** | Geen | Standaard. Geen API-sleutel nodig. |
| **LibreTranslate** | Endpoint-URL | Eigen of openbare server. Volledige privacycontrole. |

---

## 🎛️ Gebruik

1. Ga naar een Udemy-lespagina
2. Klik op het extensiepictogram
3. Bij de eerste keer — kies je taal
4. Zet ondertitels aan of open het transcriptiepaneel
5. Houd **Extensie ingeschakeld** aan
6. Vertaalde ondertitels verschijnen bovenop de video

---

## ⚠️ Beperkingen

- Werkt alleen met cursussen die al ondertitels of een transcriptie hebben
- Geen live spraak-naar-tekst
- Vertaalkwaliteit afhankelijk van aanbieder en taalpaar

---

## 🔒 Privacy

Deze extensie kan ondertiteltekst naar de geselecteerde aanbieder sturen. Er wordt geen browsegeschiedenis, persoonlijke data of Udemy-inloggegevens verzameld.

Lees [PRIVACY.md](../PRIVACY.md) voor volledige details.

---

## 📄 Licentie

[MIT](../LICENSE) © 2026