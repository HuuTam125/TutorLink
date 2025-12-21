import mongoose from 'mongoose';

const applicationSchema = mongoose.Schema({
  classRequest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClassRequest',
    required: true
  },
  tutor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Người ứng tuyển (phải là Tutor)
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'paid'], // Chưa đóng phí, Đã đóng phí
    default: 'unpaid'
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'], // Chờ duyệt, Chấp thuận, Từ chối
    default: 'pending'
  },
  message: {
    type: String, // Lời nhắn của gia sư gửi Admin/Phụ huynh (VD: "Em có bằng IELTS 8.0...")
    required: true
  },
  adminNote: {
    type: String // Ghi chú của Admin (VD: "Đã thu phí", "Hồ sơ tốt")
  },
  isReported: { type: Boolean, default: false }, // Có đang bị báo cáo không
  reportReason: { type: String }, // Lý do báo cáo
  reportStatus: {
    type: String,
    enum: ['none', 'pending', 'resolved', 'refunded', 'rejected'],
    default: 'none'
  },
  refundAmount: { type: Number, default: 0 } // Số tiền đã hoàn
}, {
  timestamps: true
});

// Đảm bảo 1 Gia sư không ứng tuyển 1 lớp 2 lần
applicationSchema.index({ classRequest: 1, tutor: 1 }, { unique: true });

export default mongoose.model("ClassApplication", applicationSchema);