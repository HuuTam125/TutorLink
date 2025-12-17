import User from '../models/User.js';
import ClassRequest from '../models/ClassRequest.js';
import TutorProfile from '../models/TutorProfile.js';
import ClassApplication from '../models/ClassApplication.js'
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
      .populate('user', 'fullName email') // Lấy thông tin người đăng
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

// @desc    Admin lấy danh sách đơn ứng tuyển (để duyệt)
// @route   GET /api/admin/applications
export const getApplicationsForAdmin = async (req, res) => {
  try {
    const apps = await ClassApplication.find({})
      .populate('tutor', 'hoTen email phoneNumber') // Lấy thông tin gia sư
      .populate('classRequest', 'subject grade status') // Lấy thông tin lớp
      .sort({ createdAt: -1 });
    res.json(apps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Admin duyệt hoặc từ chối đơn
// @route   PUT /api/admin/applications/:id/status
export const updateApplicationStatus = async (req, res) => {
  const { status, adminNote } = req.body;

  try {
    const app = await ClassApplication.findById(req.params.id);
    if (!app) return res.status(404).json({ message: "Không tìm thấy đơn" });

    // Cập nhật thông tin cơ bản
    app.status = status;
    if (adminNote) app.adminNote = adminNote;
    await app.save();

    // --- CASE 1: NẾU DUYỆT (APPROVED) ---
    if (status === 'approved') {
      const classRequest = await ClassRequest.findById(app.classRequest);
      if (classRequest) {
        // 1. Chốt đơn lớp học
        classRequest.assignedTutor = app.tutor;
        classRequest.status = 'matched'; // Đóng lớp
        await classRequest.save();

        // 2. Tự động từ chối các đối thủ khác (Logic hay nên giữ)
        await ClassApplication.updateMany(
          { classRequest: classRequest._id, _id: { $ne: app._id } },
          { status: 'rejected', adminNote: 'Lớp đã giao cho gia sư khác' }
        );

        // TODO: Gửi Notification cho Gia sư: "Chúc mừng bạn đã nhận được lớp!"
      }
    }

    // --- CASE 2: NẾU TỪ CHỐI (REJECTED) ---
    else if (status === 'rejected') {
      // Lớp học (ClassRequest) KHÔNG CẦN THAY ĐỔI GÌ CẢ (Vẫn để status là approved để người khác nộp)

      // Tuy nhiên, bạn có thể thêm logic phụ ở đây:
      // TODO: Gửi Notification cho Gia sư: "Rất tiếc, hồ sơ của bạn chưa phù hợp..."
      console.log(`Đã từ chối đơn của gia sư ${app.tutor}`);
    }

    res.json(app);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}