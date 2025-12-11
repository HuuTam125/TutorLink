import mongoose from 'mongoose';

const tutorProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Liên kết với bảng User
    required: true,
    unique: true
  },
  bio: {
    type: String, // Giới thiệu bản thân
    required: true
  },
  subjects: [{
    type: String, // Môn học: Toán, Lý, Anh...
    required: true
  }],
  grades: [{
    type: String, // Cấp lớp: Lớp 10, Lớp 11, Đại học...
    required: true
  }],
  area: {
    type: String, // Khu vực: Quận 1, Hà Nội...
    required: true
  },
  teachingMethod: {
    type: String, // Online, Offline hoặc Cả hai
    enum: ['online', 'offline', 'both'],
    default: 'both'
  },
  hourlyRate: {
    type: Number, // Mức lương mong muốn/giờ
    default: 0
  },
  experience: {
    type: String // Số năm kinh nghiệm hoặc mô tả kinh nghiệm
  },
  isApproved: {
    type: Boolean, // Admin duyệt hồ sơ mới được hiện
    default: false
  }
});

// Tạo index để tìm kiếm nhanh hơn
// 1. Index đơn cho area (Thường xuyên lọc theo khu vực)
tutorProfileSchema.index({ area: 1 });

// 2. Index cho các mảng (Tách riêng để tránh lỗi Parallel Arrays)
// MongoDB sẽ dùng "Index Intersection" khi bạn query cả subjects và grades
tutorProfileSchema.index({ subjects: 1 });
tutorProfileSchema.index({ grades: 1 });

// 3. (Tùy chọn) Index kết hợp giữa 1 trường đơn và 1 mảng (Hợp lệ)
// Ví dụ: Tìm gia sư dạy Toán tại Hà Nội (Rất phổ biến)
tutorProfileSchema.index({ area: 1, subjects: 1 });

export default mongoose.model("TutorProfile", tutorProfileSchema);