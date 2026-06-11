# TutorLink - Hệ thống kết nối gia sư sinh viên

## Giới thiệu chung
[cite_start]**TutorLink** là một nền tảng thương mại điện tử dịch vụ (Service-based E-commerce) được thiết kế nhằm kết nối trực tiếp gia sư là sinh viên các trường đại học với học viên hoặc phụ huynh có nhu cầu tìm kiếm gia sư[cite: 1944, 2015]. 

[cite_start]Dự án này được phát triển trong khuôn khổ đồ án môn học **Thiết kế hệ thống thương mại điện tử** tại Trường Đại học Công nghệ Thông tin - ĐHQG TP.HCM (UIT)[cite: 1878, 1881]. [cite_start]Hệ thống giúp tối ưu hóa quy trình tìm kiếm, quản lý dịch vụ gia sư, đồng thời nâng cao tính minh bạch và độ tin cậy thông qua các cơ chế đánh giá và thanh toán trung gian[cite: 1945].

## Các tính năng nổi bật

[cite_start]Hệ thống được thiết kế với các luồng nghiệp vụ riêng biệt cho 3 nhóm người dùng chính[cite: 2000]:

### Dành cho Gia sư (Tutor)
* [cite_start]**Quản lý hồ sơ chuyên môn:** Khởi tạo và cập nhật hồ sơ năng lực (trường học, chuyên ngành, môn dạy, mức phí)[cite: 2031].
* [cite_start]**Tìm kiếm & Nhận lớp:** Xem danh sách các lớp học đang mở, gửi yêu cầu ứng tuyển (nhận lớp)[cite: 2068].
* [cite_start]**Quản lý ví điện tử:** Nạp tiền vào ví nội bộ thông qua quét mã QR[cite: 2790].
* [cite_start]**Thanh toán phí dịch vụ:** Tự động khấu trừ 20% phí nhận lớp từ ví điện tử sau khi được phụ huynh chấp thuận để lấy thông tin liên hệ[cite: 2072, 2851].
* [cite_start]**Tương tác:** Nhắn tin trực tiếp (Real-time chat) với Admin để được hỗ trợ[cite: 2194].

### Dành cho Phụ huynh / Học viên (Parent / Student)
* [cite_start]**Đăng yêu cầu tìm gia sư:** Tạo tin đăng tìm gia sư với các tiêu chí cụ thể (môn học, khối lớp, ngân sách, hình thức học) qua từng bước (Wizard flow)[cite: 2623, 2636].
* [cite_start]**Tìm kiếm & Lọc gia sư:** Tìm kiếm gia sư chủ động theo môn học, trình độ, mức phí và gửi lời mời trực tiếp[cite: 2036, 2094].
* [cite_start]**Quản lý lớp học:** Xem lịch sử các lớp đã đăng, quản lý danh sách gia sư ứng tuyển và đưa ra quyết định chọn gia sư[cite: 2068, 2208].
* [cite_start]**Đánh giá:** Đánh giá chất lượng gia sư sau khi trải nghiệm dịch vụ[cite: 2036].

### Dành cho Quản trị viên (Admin)
* [cite_start]**Kiểm duyệt nội dung:** Phê duyệt hoặc từ chối hồ sơ đăng ký của gia sư và các bài đăng tìm gia sư từ phụ huynh[cite: 2232, 2240].
* [cite_start]**Quản lý người dùng:** Xem danh sách, khóa/mở khóa tài khoản người dùng khi có vi phạm[cite: 2223, 2226].
* [cite_start]**Hỗ trợ trực tuyến:** Chat trực tiếp với người dùng để giải đáp thắc mắc[cite: 2248].

## Công nghệ sử dụng

[cite_start]Dự án được xây dựng theo kiến trúc **Layered Architecture** kết hợp mô hình Client-Server[cite: 2950, 2955], sử dụng các công nghệ hiện đại:

* [cite_start]**Frontend (Presentation Layer):** ReactJS kết hợp với Vite[cite: 2971].
* [cite_start]**Backend (Application & Service Layer):** Node.js với framework Express.js[cite: 3165].
* [cite_start]**Database (Data Layer):** MongoDB (NoSQL)[cite: 3003].
* [cite_start]**Realtime Communication:** Socket.IO cho tính năng chat trực tuyến[cite: 2910].
* [cite_start]**Security:** BCrypt để mã hóa mật khẩu, JWT (JSON Web Token) để xác thực và phân quyền người dùng[cite: 2482, 2566].

## Kiến trúc hệ thống & Cơ sở dữ liệu

* [cite_start]**Kiến trúc phân tầng:** Hệ thống tách biệt rõ ràng các Route, Validation, Controller và các Service (Authentication, Tutor Search, Wallet & Payment, Class Management)[cite: 3052, 3054].
* [cite_start]**Cơ sở dữ liệu:** Gồm các thực thể chính như `Users`, `TutorProfiles`, `ClassRequests`, `ClassApplications`, `Wallets`, `Transactions`, `Conversations`, và `Messages`[cite: 3064, 3077]. [cite_start]Nổi bật là cơ chế giao dịch (Transaction Handling) để đảm bảo tính toàn vẹn dữ liệu khi tạo hồ sơ hoặc thanh toán[cite: 2457].
* 
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
