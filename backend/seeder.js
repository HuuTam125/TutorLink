import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js"; // Nhớ sửa lại đường dẫn cho đúng với project của bạn

// Load biến môi trường (để lấy MONGO_URI)
dotenv.config();

const seedData = async () => {
  try {
    // 1. Kết nối tới MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Đã kết nối MongoDB...");

    // 2. Mã hóa mật khẩu chung cho các tài khoản seed (VD: '123456')
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("123456", salt);

    // 3. Chuẩn bị dữ liệu Seed
    const usersToSeed = [
      {
        fullName: "Admin",
        email: "admin@example.com",
        password: hashedPassword,
        phone: "0123456789",
        role: "admin",
      },
      {
        fullName: "Tom",
        email: "tom@example.com",
        password: hashedPassword,
        phone: "0987654321",
        role: "student",
      }
    ];

    // 4. Xóa các user seed cũ nếu tồn tại để tránh lỗi duplicate email
    await User.deleteMany({
      email: { $in: ["admin@example.com", "student@example.com"] }
    });

    // 5. Thêm dữ liệu vào database
    await User.insertMany(usersToSeed);

    console.log("Đã tạo dữ liệu Admin và Student thành công!");
    process.exit(); // Thoát process thành công
  } catch (error) {
    console.error("Lỗi khi seed dữ liệu:", error.message);
    process.exit(1); // Thoát process với lỗi
  }
};

// Khởi chạy hàm seed
seedData();