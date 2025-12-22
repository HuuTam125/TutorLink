import mongoose from 'mongoose';

const conversationSchema = mongoose.Schema({
  // Danh sách người tham gia [UserID, AdminID]
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],

  // Lưu tin nhắn cuối cùng để hiển thị preview (VD: "Bạn: Đã chuyển khoản...")
  lastMessage: {
    text: String,
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
  },

  // Đánh dấu chưa đọc (Optional - làm sau )
  isReadByAdmin: { type: Boolean, default: false },
  isReadByUser: { type: Boolean, default: true },

}, { timestamps: true });

export default mongoose.model("Conversation", conversationSchema);