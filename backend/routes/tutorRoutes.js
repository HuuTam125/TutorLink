import express from 'express';
import {
  createOrUpdateTutorProfile,
  getCurrentTutorProfile,
  getAllTutors,
  getTutorById
} from '../controllers/tutorController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
// Protected routes (Cần đăng nhập)
router.get('/me', protect, getCurrentTutorProfile);
router.post('/', protect, createOrUpdateTutorProfile);

// Public routes
router.get('/', getAllTutors); // Ai cũng xem được danh sách
router.get('/:id', getTutorById);


export default router;