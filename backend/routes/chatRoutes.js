import express from 'express';
import { getAdminConversations, getMessages, getUserChatHistory } from '../controllers/chatController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';


const router = express.Router();

// Lấy danh sách hội thoại (Chỉ Admin)
router.get('/conversations', protect, admin, getAdminConversations);

// Lấy tin nhắn của 1 hội thoại (Cả Admin và User đều cần, user cần check thêm quyền sở hữu nếu kỹ)
router.get('/messages/:conversationId', protect, getMessages);

router.get('/my-history', protect, getUserChatHistory);

export default router;