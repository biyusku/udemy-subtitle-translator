# 🎓 Udemy 实时字幕翻译器

<div align="center">

![Chrome 扩展](https://img.shields.io/badge/Chrome-Extension-4285F4?logo=googlechrome&logoColor=white)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-orange)
![许可证: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![版本](https://img.shields.io/badge/version-0.2.0-blue)

**将 Udemy 字幕和讲座文稿实时翻译成任何语言 — 直接显示在视频上方。**

[← 主 README](../README.md)

</div>

---

## 📸 截图

<div align="center">

| 初始设置 | 设置面板 |
|:---:|:---:|
| ![设置](../screenshots/popup-onboarding.png) | ![设置面板](../screenshots/popup-settings.png) |

</div>

---

## ✨ 功能特点

- 🌍 **多语言支持** — 从预设语言中选择，或输入任意 ISO/BCP47 代码
- 🧠 **智能来源检测** — 从 `video.textTracks`、字幕 DOM 或文稿面板读取
- 🖥️ **全屏就绪** — 文稿缓存确保面板关闭后翻译仍然继续
- 👁️ **隐藏原始字幕** — 仅显示翻译后的叠加层
- ⚡ **翻译缓存** — 重复出现的句子即时返回，无需重新请求
- 🔌 **两种翻译提供商** — Google GTX（无需配置）或自建 LibreTranslate 服务器
- 🎯 **首次使用引导** — 一个问题设定默认语言
- 🛠️ **无需构建** — 纯 JS，通过 `Load unpacked` 直接加载

---

## 🚀 安装

### 开发者模式（手动）

1. 克隆或下载此仓库为 ZIP
2. 在 Chrome 中打开 **`chrome://extensions`**
3. 开启右上角的**开发者模式**
4. 点击**加载已解压的扩展程序**
5. 选择 **`extension/`** 文件夹

> Chrome 应用商店版本即将上线。

---

## 🔧 工作原理

```
Udemy 课程页面
       │
       ▼
 内容脚本  (content.js)
   检测当前活跃字幕文本
       │
       ▼
 后台 Worker  (background.js)
   通过所选提供商翻译文本
   缓存重复出现的句子
       │
       ▼
 在视频上方显示翻译叠加层
```

1. 内容脚本监听页面上的活跃字幕。
2. 每条新字幕发送到后台 Service Worker。
3. Worker 翻译文本并缓存结果。
4. 翻译后的字幕直接显示在视频上方。

---

## 🌐 翻译提供商

| 提供商 | 配置 | 备注 |
|---|---|---|
| **Google GTX** | 无需 | 默认。无需 API 密钥。 |
| **LibreTranslate** | Endpoint URL | 自建或公共服务器。完全隐私控制。 |

---

## 🎛️ 使用方法

1. 打开任意 Udemy 课程页面
2. 点击工具栏中的扩展图标
3. 首次启动时 — 选择你的语言
4. 在视频中开启字幕或打开文稿面板
5. 保持**扩展已启用**
6. 翻译后的字幕将显示在视频上方

---

## ⚠️ 限制

- 仅适用于已有字幕或文稿的课程
- 不支持实时语音转文字
- 翻译质量取决于所选提供商和语言对

---

## 🔒 隐私

本扩展可能将字幕文本发送至所选的翻译提供商。不会收集任何浏览历史、个人数据或 Udemy 账户凭据。

详情请阅读 [PRIVACY.md](../PRIVACY.md)。

---

## 📄 许可证

[MIT](../LICENSE) © 2026