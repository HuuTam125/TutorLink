import mongoose from 'mongoose';

const transactionSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['deposit', 'payment', 'refund'], // Nạp tiền, Thanh toán phí, Hoàn tiền
    required: true
  },
  amount: {
    type: Number,
    required: true // Số tiền giao dịch
  },

  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'completed'
    // Mặc định là 'completed' cho các giao dịch trừ tiền trong ví (thanh toán phí).
    // Riêng nạp tiền QR thì Controller sẽ set thủ công là 'pending'.
  },

  balanceBefore: {
    type: Number
    // Lưu số dư TRƯỚC khi giao dịch thành công
  },
  balanceAfter: {
    type: Number
    // Lưu số dư SAU khi giao dịch thành công (Snapshot để đối soát)
  },

  description: {
    type: String,
    required: true
  },

  relatedApplication: { // Chỉ dùng khi type = 'payment' hoặc 'refund'
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClassApplication'
  },
}, {
  timestamps: true // Tự động có createdAt, updatedAt
});

export default mongoose.model("Transaction", transactionSchema);