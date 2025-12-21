import mongoose from 'mongoose';

const classRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Người đăng (Phụ huynh/Học viên)
    required: true
  },
  assignedTutor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Link tới bảng User (role Tutor)
    default: undefined // Ban đầu chưa có ai
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
    type: Number, // Học Phí
    required: true
  },
  address: {
    type: String, // Địa chỉ dạy
    required: true
  },
  genderPreference: { type: String, enum: ['any', 'male', 'female'], default: 'any' },
  teachingMethod: { type: String, enum: ['online', 'offline', 'both'], default: 'both' },
  status: {
    type: String,
    enum: ['pending', 'approved', 'matched', 'closed'], // Đang chờ, Đã duyệt, Đã tìm được, Đóng
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

export default mongoose.model("ClassRequest", classRequestSchema);
