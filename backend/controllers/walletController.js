import Transaction from '../models/Transaction.js';
import User from '../models/User.js';
import ClassApplication from '../models/ClassApplication.js'

// @desc    Bước 1: Tạo yêu cầu nạp tiền (Pending) -> Trả về URL để sinh QR
// @route   POST /api/wallet/create-payment-link
export const createPaymentLink = async (req, res) => {
  const { amount } = req.body;
  try {
    // Tạo giao dịch với trạng thái 'pending'
    const transaction = await Transaction.create({
      user: req.user._id,
      type: 'deposit',
      amount: amount,
      status: 'pending',
      description: `Nạp tiền qua QR Code: ${Number(amount).toLocaleString()}đ`,
      balanceBefore: req.user.walletBalance,
      balanceAfter: req.user.walletBalance // Chưa cộng tiền
    });

    // Tạo URL mà điện thoại sẽ truy cập 
    // Ví dụ ID giao dịch: 65a...
    const paymentUrl = `${req.protocol}://${req.get('host')}/api/wallet/confirm-payment/${transaction._id}`;

    res.json({
      paymentUrl,
      transactionId: transaction._id
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Bước 2: Link này được gọi khi điện thoại quét QR
// @route   GET /api/wallet/confirm-payment/:id
// @access  Public (Không cần token vì điện thoại quét độc lập)
export const confirmPaymentOnMobile = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) return res.send("<h1>Giao dịch không tồn tại</h1>");
    if (transaction.status === 'completed') return res.send("<h1>Giao dịch đã hoàn tất trước đó!</h1>");

    // 1. Cập nhật trạng thái giao dịch
    transaction.status = 'completed';

    // 2. Cộng tiền vào ví User
    const user = await User.findById(transaction.user);
    user.walletBalance += transaction.amount;
    await user.save();

    // 3. Cập nhật số dư cuối trong transaction
    transaction.balanceAfter = user.walletBalance;
    await transaction.save();

    // 4. Trả về giao diện HTML cho điện thoại
    res.send(`
            <div style="text-align: center; padding-top: 50px; font-family: sans-serif;">
                <h1 style="color: green; font-size: 50px;">✔</h1>
                <h2>Thanh toán thành công!</h2>
                <p>Bạn đã nạp ${transaction.amount.toLocaleString()}đ</p>
                <p>Vui lòng kiểm tra ví.</p>
            </div>
        `);
  } catch (error) {
    res.status(500).send("<h1>Lỗi hệ thống</h1>");
  }
};

// @desc    Bước 3: Frontend máy tính gọi liên tục để check xem xong chưa
// @route   GET /api/wallet/check-status/:id
export const checkTransactionStatus = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ message: "Not found" });

    res.json({ status: transaction.status }); // Trả về 'pending' hoặc 'completed'
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
      history: transactions,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};