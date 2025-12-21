import ClassRequest from '../models/ClassRequest.js';
import ClassApplication from '../models/ClassApplication.js';
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

// @desc    Lấy tất cả yêu cầu, có lọc (Cho trang chủ / Gia sư tìm lớp)
// @route   GET /api/requests
// @access  Public
export const getAllClassRequests = async (req, res) => {
  try {
    const query = { status: 'approved' }; // Chỉ lấy lớp đã duyệt

    // === BỘ LỌC ===

    // Môn học
    if (req.query.subjects) {
      const subjects = req.query.subjects.split(',').map((s) => s.trim());
      // dùng $regex để khớp linh hoạt hơn, tránh lỗi "Toán" ≠ "Toán học"
      query.$or = subjects.map((sub) => ({
        subject: { $regex: sub, $options: 'i' },
      }));
    }

    // Cấp lớp
    if (req.query.grades) {
      const grades = req.query.grades.split(',').map((g) => g.trim());
      // cho phép dùng regex để tránh sai chính tả nhỏ hoặc ghi chú mở rộng
      query.grade = { $in: grades };
    }

    // Hình thức dạy
    if (req.query.method) {
      query.teachingMethod = req.query.method;
    }

    // Giới tính yêu cầu
    if (req.query.gender) {
      switch (req.query.gender) {
        case 'Nam':
          query.genderPreference = 'male';
          break;
        case 'Nữ':
          query.genderPreference = 'female';
          break;
        default:
          query.genderPreference = 'any';
      }
    }

    // Khu vực (đã chỉnh để tìm “linh hoạt” hơn)
    if (req.query.area && req.query.area.trim() !== '') {
      // ví dụ: người dùng gõ “Quận 1” hoặc “Hà Nội” → tìm trong address
      query.address = { $regex: req.query.area.trim(), $options: 'i' };
    }

    // === SẮP XẾP ===
    let sortOption = {};
    switch (req.query.sort) {
      case 'budget_desc':
        sortOption.budget = -1;
        break;
      case 'budget_asc':
        sortOption.budget = 1;
        break;
      case 'newest':
      default:
        sortOption.createdAt = -1;
        break;
    }

    // === TRUY VẤN ===
    const requests = await ClassRequest.find(query)
      .populate('user', 'fullName avatar')
      .sort(sortOption);

    res.json(requests);
  } catch (error) {
    console.error('Error fetching class requests:', error);
    res.status(500).json({ message: 'Lỗi khi tải danh sách lớp học' });
  }
};
// @desc    Lấy chi tiết một yêu cầu lớp học theo ID
// @route   GET /api/requests/:id
// @access  Public (Ai cũng xem được để cân nhắc nhận lớp)
export const getClassRequestById = async (req, res) => {
  try {
    const requestId = req.params.id;

    // Tìm lớp theo ID và populate thông tin người đăng (user)
    // Bạn có thể lấy thêm 'email' hoặc 'phoneNumber' nếu muốn hiển thị thông tin liên hệ ngay
    const request = await ClassRequest.findById(requestId)
      .populate('user', 'fullName avatar email phoneNumber');

    if (!request) {
      return res.status(404).json({ message: 'Không tìm thấy lớp học này' });
    }

    res.json(request);
  } catch (error) {
    console.error('Error fetching request by ID:', error);

    // Kiểm tra nếu lỗi do ID không đúng định dạng MongoDB
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'ID lớp học không hợp lệ' });
    }

    res.status(500).json({ message: 'Lỗi server khi lấy chi tiết lớp' });
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

// @desc    Lấy danh sách gia sư ứng tuyển cho lớp của tôi
// @route   GET /api/requests/:id/applications
// @access  Private (Owner only)
export const getApplicationsForRequest = async (req, res) => {
  try {
    // 1. Kiểm tra lớp học có tồn tại không
    const classRequest = await ClassRequest.findById(req.params.id);
    if (!classRequest) return res.status(404).json({ message: "Lớp học không tồn tại" });

    // 2. Kiểm tra quyền chính chủ (Chỉ người đăng lớp mới được xem)
    if (classRequest.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Bạn không có quyền xem danh sách này" });
    }

    // 3. Lấy danh sách ứng tuyển
    const apps = await ClassApplication.find({ classRequest: req.params.id })
      .populate('tutor', 'fullName email phone') // Lấy thông tin gia sư
      .sort({ createdAt: -1 });

    res.json(apps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Phụ huynh CHẤP NHẬN gia sư
// @route   PUT /api/requests/application/:appId/accept
// @access  Private (Owner only)
export const acceptTutor = async (req, res) => {
  try {
    const app = await ClassApplication.findById(req.params.appId);
    if (!app) return res.status(404).json({ message: "Đơn ứng tuyển không tồn tại" });

    // Kiểm tra quyền sở hữu thông qua classRequest
    const classRequest = await ClassRequest.findById(app.classRequest);
    if (classRequest.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Bạn không phải chủ lớp học này" });
    }

    // Cập nhật trạng thái
    app.status = 'approved';
    await app.save();

    res.json({ message: "Đã chọn gia sư thành công! Vui lòng chờ gia sư đóng phí." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};