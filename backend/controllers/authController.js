import User from "../models/User.js";
import TutorProfile from '../models/TutorProfile.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Hàm tạo Token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token hết hạn sau 30 ngày
  });
};
// @desc    Đăng ký tài khoản mới
// @route   POST /api/auth/register
export const registerUser = async (req, res) => {
  // Lấy thêm các trường của Profile từ body
  const {
    fullName, email, password, phone, role, // Thông tin User
    // THÊM university và major vào đây
    university, major, bio, subjects, grades, area, teachingMethod, hourlyRate, experience
  } = req.body;

  try {
    // 1. Kiểm tra user tồn tại
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email này đã được sử dụng' });
    }

    // 2. Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Tạo User trước
    const user = await User.create({
      fullName, email, password: hashedPassword, phone, role
    });

    // 4. NẾU LÀ GIA SƯ -> TẠO LUÔN PROFILE
    if (user && role === 'tutor') {
      try {
        await TutorProfile.create({
          user: user._id, // Link với user vừa tạo
          university: university || 'Đang cập nhật',
          major: major || 'Đang cập nhật',
          // -----------------------
          bio: bio || 'Chưa cập nhật',
          subjects: subjects ? subjects.split(',').map(s => s.trim()) : [],
          grades: grades ? grades.split(',').map(g => g.trim()) : [],
          area: area || 'Chưa cập nhật',
          teachingMethod: teachingMethod || 'both',
          hourlyRate: hourlyRate || 0,
          experience: experience || '',
          isApproved: false // Mặc định chưa duyệt
        });
      } catch (profileError) {
        // QUAN TRỌNG: Nếu tạo Profile lỗi -> Xóa luôn User vừa tạo để tránh rác (Transaction thủ công)
        await User.findByIdAndDelete(user._id);
        return res.status(400).json({ message: 'Lỗi tạo hồ sơ gia sư: ' + profileError.message });
      }
    }

    // 5. Trả về kết quả thành công
    if (user) {
      res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(400).json({ message: 'Dữ liệu không hợp lệ' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc    Đăng nhập & lấy Token
// @route   POST /api/auth/login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Tìm user theo email
    const user = await User.findOne({
      email,
      role: { $in: ["student", "tutor", "admin"] }
    });

    // 2. Kiểm tra mật khẩu
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};