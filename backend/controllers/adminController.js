import User from '../models/User.js';
import ClassRequest from '../models/ClassRequest.js';
import TutorProfile from '../models/TutorProfile.js';
import ClassApplication from '../models/ClassApplication.js'
import Transaction from '../models/Transaction.js';
// @desc    Lấy danh sách tất cả người dùng
// @route   GET /api/admin/users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password'); // Không lấy password
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Lấy danh sách gia sư chưa được duyệt (Pending)
// @route   GET /api/admin/tutors-pending
export const getPendingTutors = async (req, res) => {
  try {
    const tutors = await TutorProfile.find({ isApproved: false }).populate('user', 'fullName email');
    res.json(tutors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Duyệt hồ sơ gia sư
// @route   PUT /api/admin/approve-tutor/:id
export const approveTutor = async (req, res) => {
  try {
    const tutor = await TutorProfile.findById(req.params.id);
    if (tutor) {
      tutor.isApproved = true;
      await tutor.save();
      res.json({ message: 'Đã duyệt hồ sơ gia sư' });
    } else {
      res.status(404).json({ message: 'Không tìm thấy hồ sơ' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Xóa người dùng (Nếu xóa user thì xóa luôn Profile và Lớp đã đăng của họ)
// @route   DELETE /api/admin/users/:id
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.deleteOne();
      // (Thực tế nên dùng middleware của Mongoose để xóa cascade các dữ liệu liên quan, nhưng ở đây ta làm đơn giản trước)
      await TutorProfile.findOneAndDelete({ user: req.params.id });
      res.json({ message: 'Đã xóa người dùng' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Lấy danh sách các lớp học đang chờ duyệt (Pending)
// @route   GET /api/admin/requests-pending
export const getPendingClassRequests = async (req, res) => {
  try {
    // Lấy các request có status là 'pending'
    const requests = await ClassRequest.find({ status: 'pending' })
      .populate('user', 'fullName phone email ') // Lấy thông tin người đăng
      .sort({ createdAt: -1 }); // Mới nhất lên đầu
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc    Duyệt yêu cầu lớp học
// @route   PUT /api/admin/approve-request/:id
export const approveClassRequest = async (req, res) => {
  try {
    const request = await ClassRequest.findById(req.params.id);

    if (request) {
      request.status = 'approved'; // Chuyển trạng thái thành 'approved'
      await request.save();
      res.json({ message: 'Đã duyệt yêu cầu lớp học' });
    } else {
      res.status(404).json({ message: 'Không tìm thấy yêu cầu' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTutorProfileById = async (req, res) => {
  try {
    const profile = await TutorProfile.findOne({ user: req.params.id })
      .populate('user', 'fullName email phone avatar');
    if (!profile) {
      return res.status(404).json({ message: 'Không tìm thấy hồ sơ gia sư' });
    }

    res.json(profile);
  } catch (error) {
    console.error(error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Không tìm thấy hồ sơ gia sư' });
    }
    res.status(500).json({ message: 'Lỗi Server' });
  }
};

// @desc    Lấy danh sách các đơn đang có khiếu nại (reportStatus = 'pending')
// @route   GET /api/admin/reports
export const getPendingReports = async (req, res) => {
  try {
    // Tìm các đơn ứng tuyển có reportStatus là 'pending'
    const reports = await ClassApplication.find({ reportStatus: 'pending' })
      .populate('tutor', 'fullName email phone') // Lấy thông tin Gia sư báo cáo
      .populate('classRequest', 'subject budget')   // Lấy thông tin Lớp học để biết giá tiền
      .sort({ updatedAt: -1 }); // Sắp xếp đơn mới báo cáo lên đầu

    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Lấy danh sách các lớp đã kết nối thành công (Status = 'matched')
// @route   GET /api/admin/matched-classes
export const getMatchedClasses = async (req, res) => {
  try {
    // Tìm các lớp có status là 'matched'
    const classes = await ClassRequest.find({ status: 'matched' })
      .populate('user', 'fullName email') // Lấy thông tin Phụ huynh
      .populate('assignedTutor', 'fullName phone email') // Lấy thông tin Gia sư được chọn
      .sort({ updatedAt: -1 }); // Sắp xếp mới nhất lên đầu

    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc    Lấy toàn bộ lịch sử giao dịch (Mới nhất lên đầu)
// @route   GET /api/admin/transactions
export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({})
      .populate('user', 'fullName email') // Để biết ai thực hiện giao dịch
      .sort({ createdAt: -1 }); // Sắp xếp mới nhất trước
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Admin TỪ CHỐI hoàn tiền (Đánh dấu đã giải quyết)
// @route   PUT /api/admin/applications/:id/resolve-report
export const dismissReport = async (req, res) => {
  try {
    const app = await ClassApplication.findById(req.params.id);

    if (!app) {
      return res.status(404).json({ message: "Không tìm thấy đơn" });
    }

    // Cập nhật trạng thái thành 'resolved' (Đã giải quyết nhưng không hoàn tiền)
    app.reportStatus = 'resolved';
    // Có thể thêm ghi chú nếu muốn (cần update model field adminNote)

    await app.save();

    res.json({ message: "Đã từ chối khiếu nại. Trạng thái đơn được cập nhật." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Admin CHẤP NHẬN hoàn tiền
// @route   POST /api/admin/refund
export const processRefund = async (req, res) => {
  const { applicationId } = req.body;

  try {
    const app = await ClassApplication.findById(applicationId).populate('classRequest');
    if (!app) return res.status(404).json({ message: "Không tìm thấy đơn" });

    // Kiểm tra logic: Chỉ hoàn tiền nếu đang có khiếu nại pending
    if (app.reportStatus !== 'pending') {
      return res.status(400).json({ message: "Đơn này không có khiếu nại chờ xử lý hoặc đã xử lý rồi" });
    }

    // 1. Tính tiền hoàn (15% budget)
    const refundAmount = app.classRequest.budget * 0.15;

    // 2. Cộng tiền vào ví Gia sư
    const tutor = await User.findById(app.tutor);
    const prevBalance = tutor.walletBalance;
    tutor.walletBalance += refundAmount;
    await tutor.save();

    // 3. Ghi log giao dịch (Transaction Model)
    await Transaction.create({
      user: tutor._id,
      type: 'refund',
      amount: refundAmount,
      balanceBefore: prevBalance,
      balanceAfter: tutor.walletBalance,
      description: `Hoàn tiền lớp: ${app.classRequest.subject} (Lý do: ${app.reportReason})`,
      relatedApplication: app._id
    });

    // 4. Update trạng thái đơn
    app.reportStatus = 'refunded';
    app.refundAmount = refundAmount;
    await app.save();

    res.json({ message: "Đã hoàn tiền thành công" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};