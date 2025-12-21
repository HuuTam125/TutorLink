import mongoose from 'mongoose';

const invitationSchema = mongoose.Schema({
  tutor: { // Người được mời
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sender: { // Phụ huynh mời
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  classRequest: { // Mời dạy lớp nào
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClassRequest',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'], // accepted: Gia sư đã bấm xem/ứng tuyển
    default: 'pending'
  }
}, {
  timestamps: true
});

// Chặn spam: 1 Phụ huynh không mời 1 Gia sư quá 1 lần cho cùng 1 lớp
invitationSchema.index({ tutor: 1, classRequest: 1 }, { unique: true });

export default mongoose.model("Invitation", invitationSchema);