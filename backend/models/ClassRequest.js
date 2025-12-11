import mongoose from 'mongoose';

const classRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Người đăng (Phụ huynh/Học viên)
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  grade: {
    type: String,
    required: true
  },
  description: {
    type: String, // Yêu cầu chi tiết
    required: true
  },
  sessionsPerWeek: {
    type: Number, // Số buổi/tuần
    required: true
  },
  budget: {
    type: Number, // Ngân sách dự kiến
    required: true
  },
  address: {
    type: String, // Địa chỉ dạy
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'matched', 'closed'], // Đang chờ, Đã duyệt, Đã tìm được, Đóng
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("ClassRequest", classRequestSchema);
