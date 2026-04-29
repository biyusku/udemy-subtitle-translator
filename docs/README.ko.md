# 🎓 Udemy 라이브 자막 번역기

<div align="center">

![Chrome 확장 프로그램](https://img.shields.io/badge/Chrome-Extension-4285F4?logo=googlechrome&logoColor=white)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-orange)
![라이선스: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![버전](https://img.shields.io/badge/version-0.2.0-blue)

**Udemy 자막과 스크립트를 원하는 언어로 번역 — 동영상 위에 실시간으로 표시.**

[← 메인 README](../README.md)

</div>

---

## 📸 스크린샷

<div align="center">

| 첫 번째 설정 | 설정 패널 |
|:---:|:---:|
| ![설정](../screenshots/popup-onboarding.png) | ![패널](../screenshots/popup-settings.png) |

</div>

---

## ✨ 기능

- 🌍 **다국어 지원** — 사전 설정된 언어 중 선택하거나 ISO/BCP47 코드 직접 입력
- 🧠 **스마트 소스 감지** — `video.textTracks`, 자막 DOM 또는 스크립트 패널에서 읽기
- 🖥️ **전체 화면 지원** — 스크립트 캐시로 패널이 닫힌 후에도 번역 유지
- 👁️ **원본 자막 숨기기** — 번역된 오버레이만 표시
- ⚡ **번역 캐시** — 반복 문장을 새 요청 없이 즉시 제공
- 🔌 **두 가지 번역 제공자** — Google GTX (설정 불필요) 또는 자체 LibreTranslate 서버
- 🎯 **첫 실행 설정 마법사** — 한 가지 질문으로 기본 언어 설정
- 🛠️ **빌드 과정 없음** — 순수 JS, `Load unpacked`로 바로 로드

---

## 🚀 설치

### 개발자 모드 (수동)

1. 이 저장소를 클론하거나 ZIP으로 다운로드
2. Chrome에서 **`chrome://extensions`** 열기
3. 오른쪽 상단 **개발자 모드** 활성화
4. **압축 해제된 확장 프로그램을 로드합니다** 클릭
5. **`extension/`** 폴더 선택

> Chrome 웹 스토어 버전 곧 출시 예정.

---

## 🔧 작동 방식

```
Udemy 강의 페이지
       │
       ▼
 콘텐츠 스크립트  (content.js)
   활성 자막 텍스트 감지
       │
       ▼
 백그라운드 워커  (background.js)
   선택한 제공자로 번역
   반복 문장 캐시 저장
       │
       ▼
 동영상 위에 오버레이로 추가
```

1. 콘텐츠 스크립트가 페이지의 활성 자막 텍스트를 모니터링.
2. 새로운 줄마다 백그라운드 서비스 워커로 전송.
3. 워커가 텍스트를 번역하고 결과를 캐시.
4. 번역된 자막이 동영상 위에 직접 표시.

---

## 🌐 번역 제공자

| 제공자 | 설정 | 비고 |
|---|---|---|
| **Google GTX** | 없음 | 기본값. API 키 불필요. |
| **LibreTranslate** | 엔드포인트 URL | 자체 또는 공개 서버. 완전한 개인정보 제어. |

---

## 🎛️ 사용법

1. Udemy 강의 페이지로 이동
2. 툴바의 확장 프로그램 아이콘 클릭
3. 첫 실행 시 — 언어 선택
4. 동영상 자막 활성화 또는 스크립트 패널 열기
5. **확장 프로그램 사용** 켜진 상태 유지
6. 번역된 자막이 동영상 위에 표시

---

## ⚠️ 제한 사항

- 자막 또는 스크립트가 있는 강의에서만 작동
- 실시간 음성-텍스트 변환 미지원
- 번역 품질은 제공자와 언어 쌍에 따라 다름

---

## 🔒 개인정보 보호

이 확장 프로그램은 자막/스크립트 텍스트를 선택한 번역 제공자에게 전송할 수 있습니다. 브라우징 기록, 개인 데이터 또는 Udemy 자격 증명은 수집되지 않습니다.

자세한 내용은 [PRIVACY.md](../PRIVACY.md)를 읽어주세요.

---

## 📄 라이선스

[MIT](../LICENSE) © 2026