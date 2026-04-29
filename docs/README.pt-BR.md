# 🎓 Tradutor de Legendas ao Vivo para Udemy

<div align="center">

![Extensão Chrome](https://img.shields.io/badge/Chrome-Extension-4285F4?logo=googlechrome&logoColor=white)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-orange)
![Licença: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![Versão](https://img.shields.io/badge/version-0.2.0-blue)

**Traduza legendas e transcrições do Udemy para qualquer idioma — em tempo real, sobre o vídeo.**

[← README principal](../README.md)

</div>

---

## 📸 Capturas de tela

<div align="center">

| Configuração inicial | Painel de configurações |
|:---:|:---:|
| ![Configuração](../screenshots/popup-onboarding.png) | ![Configurações](../screenshots/popup-settings.png) |

</div>

---

## ✨ Funcionalidades

- 🌍 **Suporte multilíngue** — escolha entre idiomas predefinidos ou insira um código ISO/BCP47 personalizado
- 🧠 **Detecção inteligente de fonte** — lê de `video.textTracks`, DOM de legendas ou painel de transcrição
- 🖥️ **Pronto para tela cheia** — cache de transcrição mantém as traduções ativas após o painel fechar
- 👁️ **Ocultar legendas originais** — exibir apenas a camada traduzida
- ⚡ **Cache de traduções** — linhas repetidas entregues instantaneamente
- 🔌 **Dois provedores** — Google GTX (sem configuração) ou seu próprio servidor LibreTranslate
- 🎯 **Assistente de primeiro uso** — uma pergunta para definir o idioma padrão
- 🛠️ **Sem etapa de build** — JS puro, carregado diretamente

---

## 🚀 Instalação

### Modo desenvolvedor (manual)

1. Clone ou baixe este repositório como ZIP
2. Abra **`chrome://extensions`** no Chrome
3. Ative o **Modo do desenvolvedor** (canto superior direito)
4. Clique em **Carregar sem compactação**
5. Selecione a pasta **`extension/`**

> Versão para Chrome Web Store em breve.

---

## 🔧 Como funciona

```
Página de aula do Udemy
       │
       ▼
 Script de conteúdo  (content.js)
   Detecta o texto da legenda ativa
       │
       ▼
 Worker em segundo plano  (background.js)
   Traduz com o provedor selecionado
   Salva linhas repetidas em cache
       │
       ▼
 Camada adicionada sobre o vídeo
```

1. O script monitora a legenda ativa na página.
2. Cada nova linha é enviada ao service worker em segundo plano.
3. O worker traduz o texto e armazena o resultado em cache.
4. A legenda traduzida aparece diretamente sobre o vídeo.

---

## 🌐 Provedores de tradução

| Provedor | Configuração | Notas |
|---|---|---|
| **Google GTX** | Nenhuma | Padrão. Sem chave de API. |
| **LibreTranslate** | URL do endpoint | Servidor próprio ou público. Controle total de privacidade. |

---

## 🎛️ Como usar

1. Acesse qualquer página de aula do Udemy
2. Clique no ícone da extensão
3. No primeiro uso — escolha seu idioma
4. Ative as legendas no vídeo ou abra o painel de transcrição
5. Mantenha **Extensão ativada**
6. As legendas traduzidas aparecem sobre o vídeo

---

## ⚠️ Limitações

- Funciona apenas com cursos que já têm legendas ou transcrição
- Não faz conversão de voz para texto em tempo real
- A qualidade da tradução depende do provedor e do par de idiomas

---

## 🔒 Privacidade

Esta extensão pode enviar texto de legendas ao provedor selecionado. Nenhum histórico de navegação, dados pessoais ou credenciais do Udemy são coletados.

Leia [PRIVACY.md](../PRIVACY.md) para detalhes completos.

---

## 📄 Licença

[MIT](../LICENSE) © 2026