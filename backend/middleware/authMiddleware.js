import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import fs from 'fs';
import path from 'path';

// ĐỌC PUBLIC KEY: Frontend hoặc Middleware chỉ cần khóa này để xác thực
const publicKey = fs.readFileSync(path.resolve('keys/public.pem'), 'utf8').replace(/\r\n/g, '\n');
console.log("Base64 trên Server: ", Buffer.from(publicKey).toString('base64'));
export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Lấy token từ header: "Bearer abcxyz..." -> lấy "abcxyz..."
      token = req.headers.authorization.split(' ')[1];

      // // GIẢI MÃ BẰNG PUBLIC KEY & WHITELIST THUẬT TOÁN
      // const decoded = jwt.verify(token, publicKey, {
      //   algorithms: ['RS256'] // Chặn hoàn toàn lỗ hổng Algorithm Confusion
      // });

      // LỖ HỔNG NẰM Ở ĐÂY: 
      // 1. Không khai báo 'algorithms' (trong các bản thư viện cũ)
      // 2. Hoặc lập trình viên vô tình cho phép cả HS256 vì nghĩ dự án dùng nhiều loại token
      const decoded = jwt.verify(token, publicKey, {
        algorithms: ['RS256', 'HS256'] // <-- SAI LẦM Ở ĐÂY
      });

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