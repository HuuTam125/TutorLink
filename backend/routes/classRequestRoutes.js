import express from 'express';
import {
  createClassRequest,
  getAllClassRequests,
  getMyClassRequests,
  deleteClassRequest,
  getClassRequestById
} from '../controllers/classRequestController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
// Các route không có param (hoặc param cố định)
router.post('/', protect, createClassRequest);
router.get('/', getAllClassRequests);
router.get('/my-requests', protect, getMyClassRequests);

// Route có param động (:id) đ
router.delete('/:id', protect, deleteClassRequest);
router.get('/:id', getClassRequestById);


export default router;