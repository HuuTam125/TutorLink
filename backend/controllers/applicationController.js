import ClassApplication from '../models/ClassApplication.js';
import ClassRequest from '../models/ClassRequest.js';

// @desc    Gia sư ứng tuyển nhận lớp
// @route   POST /api/applications
// @access  Private (Tutor only)
export const applyForClass = async (req, res) => {
  const { classRequestId, message } = req.body;

  try {
    // 1. Kiểm tra xem lớp học có tồn tại và còn mở không
    const classRequest = await ClassRequest.findById(classRequestId);
    if (!classRequest) {
      return res.status(404).json({ message: 'Lớp học không tồn tại' });
    }
    if (classRequest.status !== 'approved') { // Lớp phải được duyệt mới được ứng tuyển
      return res.status(400).json({ message: 'Lớp học này chưa sẵn sàng hoặc đã đóng' });
    }

    // 2. Kiểm tra xem gia sư đã ứng tuyển chưa (Dù đã có index unique nhưng check code cho chắc)
    const existingApp = await ClassApplication.findOne({
      classRequest: classRequestId,
      tutor: req.user._id
    });

    if (existingApp) {
      return res.status(400).json({ message: 'Bạn đã ứng tuyển lớp này rồi' });
    }

    // 3. Tạo đơn ứng tuyển
    const application = await ClassApplication.create({
      classRequest: classRequestId,
      tutor: req.user._id,
      message,
      status: 'pending' // Mặc định chờ phụ huynh duyệt
    });

    res.status(201).json(application);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Lấy danh sách đơn ứng tuyển CỦA TÔI (Gia sư)
// @route   GET /api/applications/my-applications
// @access  Private (Tutor only)
export const getMyApplications = async (req, res) => {
  try {
    const apps = await ClassApplication.find({ tutor: req.user._id })
      .populate({
        path: 'classRequest',
        select: 'subject grade status address budget user',
        populate: {
          path: 'user',
          select: 'fullName phone email'
        }
      })
      .sort({ createdAt: -1 });
    const result = apps.map(app => {
      const user = app.classRequest?.user;

      return {
        ...app.toObject(),

        contactInfo: user
          ? {
            fullName: user.fullName,
            phone: user.phone,
            email: user.email
          }
          : null,

        // (tuỳ chọn) XÓA user để response gọn
        classRequest: {
          ...app.classRequest.toObject(),
          user: undefined
        }
      };
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc    Gia sư báo cáo sự cố (để hoàn tiền)
// @route   POST /api/applications/:id/report
export const reportIssue = async (req, res) => {
  const { reason } = req.body;
  try {
    const app = await ClassApplication.findById(req.params.id);

    // Chỉ chủ đơn mới được báo cáo
    if (app.tutor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Không có quyền" });
    }
    // Phải thanh toán rồi mới được báo cáo
    if (app.paymentStatus !== 'paid') {
      return res.status(400).json({ message: "Bạn chưa thanh toán phí, không thể báo cáo" });
    }

    app.isReported = true;
    app.reportReason = reason;
    app.reportStatus = 'pending'; // Chờ Admin xử lý
    await app.save();

    res.json({ message: "Đã gửi báo cáo. Admin sẽ xem xét trong 24h." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};