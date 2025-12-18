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
  balanceBefore: { type: Number }, // Số dư trước khi giao dịch (để đối soát)
  balanceAfter: { type: Number },  // Số dư sau khi giao dịch
  description: {
    type: String,
    required: true
  },
  relatedApplication: { // Liên quan đến đơn ứng tuyển nào (nếu là payment)
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClassApplication'
  },
}, {
  timestamps: true // Tự động có createdAt
});

export default mongoose.model("Transaction", transactionSchema);