import express from "express";
import http from 'http';
import { Server } from 'socket.io';
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import tutorRoutes from './routes/tutorRoutes.js';
import classRequestRoutes from './routes/classRequestRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js'
import walletRoutes from './routes/walletRoutes.js';
import invitationRoutes from './routes/invitationRoutes.js'
import { saveMessage } from './controllers/chatController.js'; // Hàm lưu tin nhắn vừa viết
import chatRoutes from './routes/chatRoutes.js';

//import admin
import adminRoutes from './routes/adminRoutes.js';
// Load biến môi trường
dotenv.config();

// Kết nối Database
connectDB();
const app = express();

// --- CẤU HÌNH SERVER HTTP & SOCKET ---
const server = http.createServer(app); // Bọc express app vào HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // URL Frontend của bạn (kiểm tra kỹ port)
    methods: ["GET", "POST"]
  }
});
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
app.use('/api/chat', chatRoutes);
// Admin Routes
app.use('/api/admin', adminRoutes);

// --- SOCKET.IO LOGIC ---
io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  // 1. JOIN ROOM: User join room của chính mình
  socket.on("join_room", (userId) => {
    if (userId) {
      socket.join(userId);
      console.log(`User ${userId} joined room ${userId}`);
    }
  });

  // 2. GỬI TIN NHẮN
  socket.on("send_message", async (data) => {
    // data = { senderId, text, conversationId, receiverId (optional) }
    console.log("📩 New Msg:", data);

    // Lưu DB
    const result = await saveMessage(data.senderId, data.text, data.conversationId);

    if (result) {
      // LOGIC PHÂN LUỒNG:

      // A. Nếu có receiverId (Tức là ADMIN trả lời USER)
      if (data.receiverId) {
        console.log(`➡️ Admin rep User: ${data.receiverId}`);
        // Gửi về room của User
        io.to(data.receiverId).emit("receive_message", result);
      }

      // B. Nếu không có receiverId (Tức là USER nhắn cho ADMIN)
      else {
        console.log(`➡️ User sent to Admin`);
        // Gửi cho tất cả Admin đang nghe sự kiện này
        io.emit("admin_receive_message", result);
      }
    }
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));