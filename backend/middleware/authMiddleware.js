import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Lấy token từ header: "Bearer abcxyz..." -> lấy "abcxyz..."
      token = req.headers.authorization.split(' ')[1];

      // Giải mã token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Tìm user từ ID trong token và loại bỏ password
      req.user = await User.findById(decoded.id).select('-password');

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