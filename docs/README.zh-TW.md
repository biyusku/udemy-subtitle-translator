# 🎓 Udemy 即時字幕翻譯器

<div align="center">

![Chrome 擴充功能](https://img.shields.io/badge/Chrome-Extension-4285F4?logo=googlechrome&logoColor=white)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-orange)
![授權條款: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![版本](https://img.shields.io/badge/version-0.2.0-blue)

**將 Udemy 字幕與課程逐字稿即時翻譯成任何語言 — 直接疊加顯示在影片上方。**

[← 主要 README](../README.md)

</div>

---

## 📸 螢幕截圖

<div align="center">

| 初始設定 | 設定面板 |
|:---:|:---:|
| ![設定](../screenshots/popup-onboarding.png) | ![設定面板](../screenshots/popup-settings.png) |

</div>

---

## ✨ 功能特色

- 🌍 **多語言支援** — 從預設語言中選擇，或輸入任意 ISO/BCP47 代碼
- 🧠 **智慧來源偵測** — 從 `video.textTracks`、字幕 DOM 或逐字稿面板讀取
- 🖥️ **支援全螢幕** — 逐字稿快取確保面板關閉後翻譯仍持續運作
- 👁️ **隱藏原始字幕** — 僅顯示翻譯後的疊加層
- ⚡ **翻譯快取** — 重複出現的句子即時回傳，無需重新請求
- 🔌 **兩種翻譯提供者** — Google GTX（免設定）或自架 LibreTranslate 伺服器
- 🎯 **首次使用引導** — 一個問題設定預設語言
- 🛠️ **無需建置步驟** — 純 JS，透過 `Load unpacked` 直接載入

---

## 🚀 安裝方式

### 開發人員模式（手動）

1. 複製或下載此儲存庫為 ZIP
2. 在 Chrome 中開啟 **`chrome://extensions`**
3. 開啟右上角的**開發人員模式**
4. 點擊**載入未封裝項目**
5. 選擇 **`extension/`** 資料夾

> Chrome 線上應用程式商店版本即將推出。

---

## 🔧 運作原理

```
Udemy 課程頁面
       │
       ▼
 內容腳本  (content.js)
   偵測目前活躍字幕文字
       │
       ▼
 背景 Worker  (background.js)
   透過所選提供者翻譯文字
   快取重複出現的句子
       │
       ▼
 在影片上方顯示翻譯疊加層
```

1. 內容腳本監聽頁面上的活躍字幕。
2. 每條新字幕傳送至背景 Service Worker。
3. Worker 翻譯文字並快取結果。
4. 翻譯後的字幕直接顯示在影片上方。

---

## 🌐 翻譯提供者

| 提供者 | 設定 | 備註 |
|---|---|---|
| **Google GTX** | 無需 | 預設。無需 API 金鑰。 |
| **LibreTranslate** | Endpoint URL | 自架或公共伺服器。完整隱私控制。 |

---

## 🎛️ 使用方式

1. 開啟任意 Udemy 課程頁面
2. 點擊工具列中的擴充功能圖示
3. 首次啟動時 — 選擇您的語言
4. 在影片中開啟字幕或開啟逐字稿面板
5. 保持**擴充功能已啟用**
6. 翻譯後的字幕將顯示在影片上方

---

## ⚠️ 限制

- 僅適用於已有字幕或逐字稿的課程
- 不支援即時語音轉文字
- 翻譯品質取決於所選提供者與語言對

---

## 🔒 隱私權

本擴充功能可能將字幕文字傳送至所選翻譯提供者。不會收集任何瀏覽記錄、個人資料或 Udemy 帳號憑證。

詳情請閱讀 [PRIVACY.md](../PRIVACY.md)。

---

## 📄 授權條款

[MIT](../LICENSE) © 2026