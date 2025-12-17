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
      status: 'pending' // Mặc định chờ Admin duyệt
    });

    res.status(201).json(application);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

