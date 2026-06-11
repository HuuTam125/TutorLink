# TutorLink - Hệ thống kết nối gia sư sinh viên

## Giới thiệu chung
**TutorLink** là một nền tảng thương mại điện tử dịch vụ (Service-based E-commerce) được thiết kế nhằm kết nối trực tiếp gia sư là sinh viên các trường đại học với học viên hoặc phụ huynh có nhu cầu tìm kiếm gia sư. 

Dự án này được phát triển trong khuôn khổ đồ án môn học **Thiết kế hệ thống thương mại điện tử** tại Trường Đại học Công nghệ Thông tin - ĐHQG TP.HCM (UIT). Hệ thống giúp tối ưu hóa quy trình tìm kiếm, quản lý dịch vụ gia sư, đồng thời nâng cao tính minh bạch và độ tin cậy thông qua các cơ chế đánh giá và thanh toán trung gian.

## Các tính năng nổi bật

Hệ thống được thiết kế với các luồng nghiệp vụ riêng biệt cho 3 nhóm người dùng chính:

### Dành cho Gia sư (Tutor)
* **Quản lý hồ sơ chuyên môn:** Khởi tạo và cập nhật hồ sơ năng lực (trường học, chuyên ngành, môn dạy, mức phí).
* **Tìm kiếm & Nhận lớp:** Xem danh sách các lớp học đang mở, gửi yêu cầu ứng tuyển (nhận lớp).
* **Quản lý ví điện tử:** Nạp tiền vào ví nội bộ thông qua quét mã QR.
* **Thanh toán phí dịch vụ:** Tự động khấu trừ 20% phí nhận lớp từ ví điện tử sau khi được phụ huynh chấp thuận để lấy thông tin liên hệ.
* **Tương tác:** Nhắn tin trực tiếp (Real-time chat) với Admin để được hỗ trợ.

### Dành cho Phụ huynh / Học viên (Parent / Student)
* **Đăng yêu cầu tìm gia sư:** Tạo tin đăng tìm gia sư với các tiêu chí cụ thể (môn học, khối lớp, ngân sách, hình thức học) qua từng bước (Wizard flow).
* **Tìm kiếm & Lọc gia sư:** Tìm kiếm gia sư chủ động theo môn học, trình độ, mức phí và gửi lời mời trực tiếp.
* **Quản lý lớp học:** Xem lịch sử các lớp đã đăng, quản lý danh sách gia sư ứng tuyển và đưa ra quyết định chọn gia sư.
* **Đánh giá:** Đánh giá chất lượng gia sư sau khi trải nghiệm dịch vụ.

### Dành cho Quản trị viên (Admin)
* **Kiểm duyệt nội dung:** Phê duyệt hoặc từ chối hồ sơ đăng ký của gia sư và các bài đăng tìm gia sư từ phụ huynh.
* **Quản lý người dùng:** Xem danh sách, khóa/mở khóa tài khoản người dùng khi có vi phạm.
* **Hỗ trợ trực tuyến:** Chat trực tiếp với người dùng để giải đáp thắc mắc.

## Công nghệ sử dụng

Dự án được xây dựng theo kiến trúc **Layered Architecture** kết hợp mô hình Client-Server, sử dụng các công nghệ hiện đại:

* **Frontend (Presentation Layer):** ReactJS kết hợp với Vite.
* **Backend (Application & Service Layer):** Node.js với framework Express.js.
* **Database (Data Layer):** MongoDB (NoSQL).
* **Realtime Communication:** Socket.IO cho tính năng chat trực tuyến.
* **Security:** BCrypt để mã hóa mật khẩu, JWT (JSON Web Token) để xác thực và phân quyền người dùng.

## Kiến trúc hệ thống & Cơ sở dữ liệu

* **Kiến trúc phân tầng:** Hệ thống tách biệt rõ ràng các Route, Validation, Controller và các Service (Authentication, Tutor Search, Wallet & Payment, Class Management).
* **Cơ sở dữ liệu:** Gồm các thực thể chính như `Users`, `TutorProfiles`, `ClassRequests`, `ClassApplications`, `Wallets`, `Transactions`, `Conversations`, và `Messages`. Nổi bật là cơ chế giao dịch (Transaction Handling) để đảm bảo tính toàn vẹn dữ liệu khi tạo hồ sơ hoặc thanh toán.

 **Cấu trúc thư mục**
 ```text
TutorLink/
├── backend/               # Mã nguồn Node.js API & Socket
│   ├── keys/              # Thư mục chứa cặp khóa RSA tự sinh (Ignore trên Git)
│   ├── config/            # Cấu hình kết nối DB
│   ├── controllers/       # Xử lý logic nghiệp vụ
│   ├── middleware/        # Middleware xác thực JWT & Role
│   ├── models/            # Mongoose Schemas
│   ├── routes/            # Khai báo API Endpoints
│   ├── Dockerfile         # Docker build script cho Backend
│   └── server.js          # Entry point (Chứa logic tự động sinh Key & Seed)
├── frontend/              # Mã nguồn ReactJS UI
│   ├── src/               # React Components, Pages, API Client
│   ├── nginx.conf         # Cấu hình Nginx cho SPA
│   └── Dockerfile         # Multi-stage build script cho Frontend
├── docker-compose.yml     # File cấu hình điều phối 3 containers
└── README.md
 ```
