import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import tutorRoutes from './routes/tutorRoutes.js';
import classRequestRoutes from './routes/classRequestRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js'
import walletRoutes from './routes/walletRoutes.js';
import invitationRoutes from './routes/invitationRoutes.js'
//import admin
import adminRoutes from './routes/adminRoutes.js';
// Load biến môi trường
dotenv.config();

// Kết nối Database
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Cho phép server đọc JSON từ client gửi lên
app.use(cors()); // Cho phép Frontend gọi API (sau này)

// User Routes
app.use("/api/auth", authRoutes);
app.use('/api/tutors', tutorRoutes);
app.use('/api/requests', classRequestRoutes);
app.use('/api/applications', applicationRoutes)
app.use('/api/wallet', walletRoutes);
app.use('/api/invitations', invitationRoutes);
// Admin Routes
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy trên cổng ${PORT}`);
});