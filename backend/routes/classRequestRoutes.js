import express from 'express';
import {
  createClassRequest,
  getAllClassRequests,
  getMyClassRequests,
  deleteClassRequest
} from '../controllers/classRequestController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public: Ai cũng có thể xem danh sách lớp để tìm việc
router.get('/', getAllClassRequests);

// Private: Phải đăng nhập mới được đăng bài, xem bài của mình, xóa bài
router.post('/', protect, createClassRequest);
router.get('/my-requests', protect, getMyClassRequests);
router.delete('/:id', protect, deleteClassRequest);


export default router;