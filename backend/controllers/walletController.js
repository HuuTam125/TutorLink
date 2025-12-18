import User from '../models/User.js';
import Transaction from '../models/Transaction.js';
import ClassApplication from '../models/ClassApplication.js';
import ClassRequest from '../models/ClassRequest.js';
// @desc    Nạp tiền vào ví (Giả lập)
// @route   POST /api/wallet/deposit
// @access  Private
export const deposit = async (req, res) => {
  const { amount } = req.body; // Số tiền muốn nạp

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Số tiền nạp phải lớn hơn 0" });
  }

  try {
    const user = await User.findById(req.user._id);
    const previousBalance = user.walletBalance;

    // 1. Cộng tiền
    user.walletBalance += Number(amount);
    await user.save();

    // 2. Lưu lịch sử giao dịch
    await Transaction.create({
      user: user._id,
      type: 'deposit',
      amount: amount,
      balanceBefore: previousBalance,
      balanceAfter: user.walletBalance,
      description: `Nạp tiền vào tài khoản: +${amount.toLocaleString()}đ`
    });

    res.json({
      message: "Nạp tiền thành công",
      newBalance: user.walletBalance
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Thanh toán phí nhận lớp (15% học phí)
// @route   POST /api/wallet/pay-class-fee
// @access  Private (Tutor)
export const payClassFee = async (req, res) => {
  const { applicationId } = req.body; // ID của đơn ứng tuyển

  try {
    // 1. Tìm đơn ứng tuyển và thông tin lớp học liên quan
    const app = await ClassApplication.findById(applicationId)
      .populate('classRequest'); // Populate để lấy 'budget' (học phí) và 'user' (phụ huynh)

    if (!app) return res.status(404).json({ message: "Không tìm thấy đơn ứng tuyển" });

    // 2. Các bước kiểm tra hợp lệ
    if (app.tutor.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Đơn này không phải của bạn" });
    }
    if (app.status !== 'approved') {
      return res.status(400).json({ message: "Đơn này chưa được Admin duyệt, không thể thanh toán" });
    }
    if (app.paymentStatus === 'paid') {
      return res.status(400).json({ message: "Bạn đã thanh toán phí cho lớp này rồi" });
    }

    // 3. Tính phí (15% ngân sách lớp học)
    // Ví dụ: Lớp 1.000.000đ -> Phí 150.000đ
    const fee = app.classRequest.budget * 0.15;

    // 4. Kiểm tra số dư ví
    const user = await User.findById(req.user._id);
    if (user.walletBalance < fee) {
      return res.status(400).json({
        message: `Số dư không đủ. Phí nhận lớp là ${fee.toLocaleString()}đ. Vui lòng nạp thêm tiền.`
      });
    }

    // 5. THỰC HIỆN GIAO DỊCH (Trừ tiền)
    const previousBalance = user.walletBalance;
    user.walletBalance -= fee;
    await user.save();

    // 6. Cập nhật trạng thái đơn -> ĐÃ THANH TOÁN
    app.paymentStatus = 'paid';
    await app.save();

    // 7. Lưu lịch sử
    await Transaction.create({
      user: user._id,
      type: 'payment',
      amount: fee,
      balanceBefore: previousBalance,
      balanceAfter: user.walletBalance,
      description: `Thanh toán phí nhận lớp: ${app.classRequest.subject}`,
      relatedApplication: app._id
    });

    // 8. LẤY THÔNG TIN LIÊN HỆ PHỤ HUYNH (Mở khóa)
    // Chúng ta cần query lại ClassRequest để populate thông tin User (Phụ huynh)
    const fullClassInfo = await ClassRequest.findById(app.classRequest._id)
      .populate('user', 'fullName phone email'); // Lấy SĐT, Email phụ huynh

    res.json({
      message: "Thanh toán thành công! Bạn đã nhận lớp.",
      newBalance: user.walletBalance,
      contactInfo: fullClassInfo.user // Trả về thông tin phụ huynh ngay lập tức
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Lấy lịch sử giao dịch
// @route   GET /api/wallet/history
// @access  Private
export const getWalletHistory = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id })
      .sort({ createdAt: -1 }); // Mới nhất lên đầu

    // Trả về kèm số dư hiện tại để hiển thị cho tiện
    const user = await User.findById(req.user._id);

    res.json({
      balance: user.walletBalance,
      history: transactions
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};