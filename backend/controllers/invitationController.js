import Invitation from '../models/Invitation.js';
import ClassRequest from '../models/ClassRequest.js';

// @desc    Gửi lời mời dạy (Phụ huynh gọi)
// @route   POST /api/invitations
export const sendInvitation = async (req, res) => {
  const { tutorId, classRequestId } = req.body;

  try {
    // 1. Kiểm tra lớp học có phải của người gửi không
    const classRequest = await ClassRequest.findById(classRequestId);
    if (!classRequest) return res.status(404).json({ message: "Lớp học không tồn tại" });

    if (classRequest.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Bạn không sở hữu lớp học này" });
    }

    if (classRequest.status !== 'approved') {
      return res.status(400).json({ message: "Lớp học phải được duyệt trước khi mời gia sư" });
    }

    // 2. Kiểm tra đã mời chưa
    const exists = await Invitation.findOne({ tutor: tutorId, classRequest: classRequestId });
    if (exists) {
      return res.status(400).json({ message: "Bạn đã mời gia sư này rồi" });
    }

    // 3. Tạo lời mời
    const invite = await Invitation.create({
      tutor: tutorId,
      sender: req.user._id,
      classRequest: classRequestId
    });

    res.status(201).json({ message: "Đã gửi lời mời thành công!", invite });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Lấy danh sách lời mời nhận được (Gia sư xem)
// @route   GET /api/invitations/my-invitations
export const getMyInvitations = async (req, res) => {
  try {
    const invites = await Invitation.find({ tutor: req.user._id })
      .populate('sender', 'hoTen avatar') // Lấy tên phụ huynh
      .populate('classRequest', 'subject grade budget address status') // Lấy thông tin lớp
      .sort({ createdAt: -1 });

    res.json(invites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};