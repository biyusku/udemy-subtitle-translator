# 🎓 Trình Dịch Phụ Đề Trực Tiếp cho Udemy

<div align="center">

![Tiện ích Chrome](https://img.shields.io/badge/Chrome-Extension-4285F4?logo=googlechrome&logoColor=white)
![Manifest V3](https://img.shields.io/badge/Manifest-V3-orange)
![Giấy phép: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![Phiên bản](https://img.shields.io/badge/version-0.2.0-blue)

**Dịch phụ đề và bản ghi âm của Udemy sang bất kỳ ngôn ngữ nào — trực tiếp, ngay trên video.**

[← README chính](../README.md)

</div>

---

## 📸 Ảnh chụp màn hình

<div align="center">

| Thiết lập lần đầu | Bảng cài đặt |
|:---:|:---:|
| ![Thiết lập](../screenshots/popup-onboarding.png) | ![Cài đặt](../screenshots/popup-settings.png) |

</div>

---

## ✨ Tính năng

- 🌍 **Hỗ trợ đa ngôn ngữ** — chọn từ danh sách có sẵn hoặc nhập mã ISO/BCP47 tùy chỉnh
- 🧠 **Phát hiện nguồn thông minh** — đọc từ `video.textTracks`, DOM phụ đề hoặc bảng bản ghi
- 🖥️ **Sẵn sàng cho toàn màn hình** — bộ nhớ cache bản ghi giữ bản dịch hoạt động
- 👁️ **Ẩn phụ đề gốc** — chỉ hiển thị lớp đã dịch
- ⚡ **Bộ nhớ cache dịch** — các dòng lặp lại được phục vụ ngay lập tức
- 🔌 **Hai nhà cung cấp** — Google GTX (không cần cấu hình) hoặc máy chủ LibreTranslate của riêng bạn
- 🎯 **Hướng dẫn lần đầu sử dụng** — một câu hỏi để thiết lập ngôn ngữ mặc định
- 🛠️ **Không cần bước build** — JS thuần, tải trực tiếp

---

## 🚀 Cài đặt

### Chế độ nhà phát triển (thủ công)

1. Clone hoặc tải xuống kho lưu trữ này dưới dạng ZIP
2. Mở **`chrome://extensions`** trong Chrome
3. Bật **Chế độ nhà phát triển** (góc trên bên phải)
4. Nhấp vào **Tải tiện ích đã giải nén**
5. Chọn thư mục **`extension/`**

> Phiên bản Chrome Web Store sắp ra mắt.

---

## 🔧 Cách hoạt động

```
Trang bài giảng Udemy
       │
       ▼
 Script nội dung  (content.js)
   Phát hiện văn bản phụ đề đang hoạt động
       │
       ▼
 Worker nền  (background.js)
   Dịch qua nhà cung cấp đã chọn
   Lưu các dòng lặp lại vào cache
       │
       ▼
 Lớp được thêm vào trên video
```

---

## 🌐 Nhà cung cấp dịch thuật

| Nhà cung cấp | Cài đặt | Ghi chú |
|---|---|---|
| **Google GTX** | Không có | Mặc định. Không cần khóa API. |
| **LibreTranslate** | URL endpoint | Máy chủ riêng hoặc công cộng. Kiểm soát quyền riêng tư đầy đủ. |

---

## 🎛️ Sử dụng

1. Truy cập bất kỳ trang bài giảng Udemy nào
2. Nhấp vào biểu tượng tiện ích
3. Lần đầu sử dụng — chọn ngôn ngữ của bạn
4. Bật phụ đề trên video hoặc mở bảng bản ghi
5. Giữ **Tiện ích đã bật**
6. Phụ đề đã dịch xuất hiện trên video

---

## ⚠️ Giới hạn

- Chỉ hoạt động với các khóa học đã có phụ đề hoặc bản ghi
- Không thực hiện chuyển đổi giọng nói thành văn bản trực tiếp
- Chất lượng dịch phụ thuộc vào nhà cung cấp và cặp ngôn ngữ

---

## 🔒 Quyền riêng tư

Tiện ích này có thể gửi văn bản phụ đề đến nhà cung cấp đã chọn. Không có lịch sử duyệt web, dữ liệu cá nhân hoặc thông tin đăng nhập Udemy nào được thu thập.

Đọc [PRIVACY.md](../PRIVACY.md) để biết chi tiết đầy đủ.

---

## 📄 Giấy phép

[MIT](../LICENSE) © 2026