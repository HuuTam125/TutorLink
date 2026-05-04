import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import fs from 'fs';
import path from 'path';

// ĐỌC PUBLIC KEY: Frontend hoặc Middleware chỉ cần khóa này để xác thực
const publicKey = fs.readFileSync(path.resolve('keys/public.pem'), 'utf8').replace(/\r\n/g, '\n');
// Biến toàn cục lưu trạng thái (Mặc định là tắt phòng thủ)
export let isDefenseMode = true;

export const toggleDefenseMode = (req, res) => {
  // Lấy trạng thái từ body gửi lên
  isDefenseMode = req.body.isDefenseMode;

  res.json({
    message: `Đã ${isDefenseMode ? 'BẬT' : 'TẮT'} chế độ phòng thủ!`,
    isDefenseMode
  });
};

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Lấy token từ header: "Bearer abcxyz..." -> lấy "abcxyz..."
      token = req.headers.authorization.split(' ')[1];

      const verifyOptions = isDefenseMode
        ? { algorithms: ['RS256'] } // BẬT PHÒNG THỦ: Chỉ định rõ thuật toán bất đối xứng
        : { algorithms: ['RS256', 'HS256'] }; // TẮT PHÒNG THỦ: Cố tình để hở HS256 (Lỗ hổng)

      // Giải mã token với options động
      const decoded = jwt.verify(token, publicKey, verifyOptions);

      if (decoded.role === 'admin') {
        // Nếu là admin, tìm bằng role thay vì tìm bằng findById để tránh lỗi ObjectId
        req.user = await User.findOne({ role: 'admin' }).select('-password');
      } else {
        // Nếu là student/tutor, tìm bằng findById như bình thường (vì là ObjectId chuẩn)
        req.user = await User.findById(decoded.id).select('-password');
      }
      next(); // Cho phép đi tiếp
    } catch (error) {
      res.status(401).json({ message: 'Token không hợp lệ, vui lòng đăng nhập lại' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Không có quyền truy cập, không tìm thấy token' });
  }
};

// 2. Chỉ cho phép GIA SƯ (Tutor)
export const tutor = (req, res, next) => {
  // Kiểm tra: Có user và vai trò phải là 'tutor'
  if (req.user && req.user.role === 'tutor') {
    next(); // Cho qua
  } else {
    // 403 Forbidden: Đã đăng nhập nhưng không có quyền
    res.status(403).json({ message: 'Chức năng chỉ dành cho Gia sư' });
  }
};

// 3. Chỉ cho phép HỌC VIÊN/PHỤ HUYNH (Student)
export const student = (req, res, next) => {
  if (req.user && req.user.role === 'student') {
    next();
  } else {
    res.status(403).json({ message: 'Chức năng chỉ dành cho Phụ huynh/Học viên' });
  }
};