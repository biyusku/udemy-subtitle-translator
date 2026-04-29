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

## 📸 Capturas de ecrã

<div align="center">

| Configuração inicial | Painel de definições |
|:---:|:---:|
| ![Configuração](../screenshots/popup-onboarding.png) | ![Definições](../screenshots/popup-settings.png) |

</div>

---

## ✨ Funcionalidades

- 🌍 **Suporte multilingue** — escolha entre idiomas predefinidos ou introduza um código ISO/BCP47
- 🧠 **Deteção inteligente de fonte** — lê de `video.textTracks`, DOM de legendas ou painel de transcrição
- 🖥️ **Pronto para ecrã inteiro** — cache de transcrição mantém as traduções ativas
- 👁️ **Ocultar legendas originais** — mostrar apenas a camada traduzida
- ⚡ **Cache de traduções** — linhas repetidas servidas instantaneamente
- 🔌 **Dois fornecedores** — Google GTX (sem configuração) ou servidor LibreTranslate próprio
- 🎯 **Assistente de primeiro arranque** — uma pergunta para definir o idioma predefinido
- 🛠️ **Sem passo de compilação** — JS puro, carregado diretamente

---

## 🚀 Instalação

### Modo de programador (manual)

1. Clone ou transfira este repositório como ZIP
2. Abra **`chrome://extensions`** no Chrome
3. Ative o **Modo de programador** (canto superior direito)
4. Clique em **Carregar sem compressão**
5. Selecione a pasta **`extension/`**

> Versão para Chrome Web Store em breve.

---

## 🔧 Como funciona

```
Página de aula do Udemy
       │
       ▼
 Script de conteúdo  (content.js)
   Deteta o texto da legenda ativa
       │
       ▼
 Worker em segundo plano  (background.js)
   Traduz com o fornecedor selecionado
   Guarda linhas repetidas em cache
       │
       ▼
 Camada adicionada sobre o vídeo
```

---

## 🌐 Fornecedores de tradução

| Fornecedor | Configuração | Notas |
|---|---|---|
| **Google GTX** | Nenhuma | Predefinido. Sem chave de API. |
| **LibreTranslate** | URL do endpoint | Servidor próprio ou público. Controlo total de privacidade. |

---

## 🎛️ Utilização

1. Aceda a qualquer página de aula do Udemy
2. Clique no ícone da extensão
3. No primeiro arranque — escolha o seu idioma
4. Ative as legendas no vídeo ou abra o painel de transcrição
5. Mantenha **Extensão ativada**
6. As legendas traduzidas aparecem sobre o vídeo

---

## ⚠️ Limitações

- Funciona apenas com cursos que têm legendas ou transcrição
- Não faz conversão de voz para texto em tempo real
- A qualidade da tradução depende do fornecedor e do par de idiomas

---

## 🔒 Privacidade

Esta extensão pode enviar texto de legendas ao fornecedor selecionado. Nenhum histórico de navegação, dados pessoais ou credenciais do Udemy são recolhidos.

Leia [PRIVACY.md](../PRIVACY.md) para detalhes completos.

---

## 📄 Licença

[MIT](../LICENSE) © 2026