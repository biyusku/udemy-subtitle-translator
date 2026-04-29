# 🎓 Traductor de Subtítulos en Vivo para Udemy

<div align="center">

![Extensión Chrome](https://img.shields.io/badge/Chrome-Extension-4285F4?logo=googlechrome&logoColor=white)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-orange)
![Licencia: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![Versión](https://img.shields.io/badge/version-0.2.0-blue)

**Traduce subtítulos y transcripciones de Udemy a cualquier idioma — en vivo, sobre el video.**

[← README principal](../README.md)

</div>

---

## 📸 Capturas de pantalla

<div align="center">

| Configuración inicial | Panel de ajustes |
|:---:|:---:|
| ![Configuración](../screenshots/popup-onboarding.png) | ![Ajustes](../screenshots/popup-settings.png) |

</div>

---

## ✨ Características

- 🌍 **Soporte multilingüe** — elige entre idiomas preconfigurados o introduce cualquier código ISO/BCP47
- 🧠 **Detección inteligente de fuente** — lee de `video.textTracks`, DOM de subtítulos o panel de transcripción
- 🖥️ **Listo para pantalla completa** — la caché de transcripción mantiene las traducciones activas
- 👁️ **Ocultar subtítulos originales** — muestra solo la capa traducida
- ⚡ **Caché de traducciones** — las líneas repetidas se sirven al instante
- 🔌 **Dos proveedores** — Google GTX (sin configuración) o tu propio servidor LibreTranslate
- 🎯 **Asistente de primer inicio** — una pregunta para configurar el idioma predeterminado
- 🛠️ **Sin paso de compilación** — JS puro, se carga directamente

---

## 🚀 Instalación

### Modo desarrollador (manual)

1. Clona o descarga este repositorio como ZIP
2. Abre **`chrome://extensions`** en Chrome
3. Activa el **Modo desarrollador** (arriba a la derecha)
4. Haz clic en **Cargar sin empaquetar**
5. Selecciona la carpeta **`extension/`**

> Versión para Chrome Web Store próximamente.

---

## 🔧 Cómo funciona

```
Página de clase de Udemy
       │
       ▼
 Script de contenido  (content.js)
   Detecta el texto del subtítulo activo
       │
       ▼
 Worker en segundo plano  (background.js)
   Traduce con el proveedor elegido
   Guarda líneas repetidas en caché
       │
       ▼
 Capa superpuesta sobre el video
```

1. El script de contenido detecta el subtítulo activo en la página.
2. Cada nueva línea se envía al service worker en segundo plano.
3. El worker traduce el texto y guarda el resultado en caché.
4. El subtítulo traducido se muestra directamente sobre el video.

---

## 🌐 Proveedores de traducción

| Proveedor | Configuración | Notas |
|---|---|---|
| **Google GTX** | Ninguna | Predeterminado. Sin clave de API. |
| **LibreTranslate** | URL del endpoint | Servidor propio o público. Control total de privacidad. |

---

## 🎛️ Uso

1. Ve a cualquier página de clase de Udemy
2. Haz clic en el icono de la extensión
3. En el primer inicio — elige tu idioma
4. Activa los subtítulos del video o abre el panel de transcripción
5. Mantén **Extensión activada**
6. Los subtítulos traducidos aparecen sobre el video

---

## ⚠️ Limitaciones

- Solo funciona con cursos que ya tienen subtítulos o transcripción
- No hace conversión de voz a texto en vivo
- La calidad de traducción depende del proveedor y el par de idiomas

---

## 🔒 Privacidad

Esta extensión puede enviar texto de subtítulos al proveedor de traducción elegido. No se recopila historial de navegación, datos personales ni credenciales de Udemy.

Lee [PRIVACY.md](../PRIVACY.md) para más detalles.

---

## 📄 Licencia

[MIT](../LICENSE) © 2026