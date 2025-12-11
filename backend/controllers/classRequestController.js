import ClassRequest from '../models/ClassRequest.js';

// @desc    Tạo yêu cầu tìm gia sư mới
// @route   POST /api/requests
// @access  Private (Student)
export const createClassRequest = async (req, res) => {
  const { subject, grade, description, sessionsPerWeek, budget, address } = req.body;

  try {
    const newRequest = new ClassRequest({
      user: req.user._id, // Lấy ID từ token (middleware)
      subject,
      grade,
      description,
      sessionsPerWeek,
      budget,
      address
    });

    const savedRequest = await newRequest.save();
    res.status(201).json(savedRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Lấy tất cả yêu cầu (Cho trang chủ/Gia sư tìm lớp)
// @route   GET /api/requests
// @access  Public
export const getAllClassRequests = async (req, res) => {
  try {
    // Chỉ lấy các lớp đang chờ (pending) hoặc đã duyệt (approved)
    // Sắp xếp mới nhất lên đầu
    const requests = await ClassRequest.find({ status: 'approved' })
      .populate('user', 'fullName avatar')
      .sort({ createdAt: -1 });
    res.json(requests);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Lấy các yêu cầu của chính tôi (Học viên xem lịch sử)
// @route   GET /api/requests/my-requests
// @access  Private
export const getMyClassRequests = async (req, res) => {
  try {
    const requests = await ClassRequest.find({ user: req.user._id })
      .sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Xóa yêu cầu
// @route   DELETE /api/requests/:id
// @access  Private
export const deleteClassRequest = async (req, res) => {
  try {
    const request = await ClassRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Không tìm thấy yêu cầu lớp học' });
    }

    // Kiểm tra quyền sở hữu: Người xóa phải là người tạo ra nó hoặc là admin
    if (request.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Bạn không có quyền xóa yêu cầu này' });
    }

    await request.deleteOne();
    res.json({ message: 'Đã xóa yêu cầu thành công' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};