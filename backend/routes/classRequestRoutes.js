import express from 'express';
import {
  createClassRequest,
  getAllClassRequests,
  getMyClassRequests,
  deleteClassRequest,
  getClassRequestById,
  getApplicationsForRequest,
  acceptTutor
} from '../controllers/classRequestController.js';
import { protect, student } from '../middleware/authMiddleware.js';

const router = express.Router();
// Các route không có param (hoặc param cố định)
router.post('/', protect, student, createClassRequest);
router.get('/', getAllClassRequests);
router.get('/my-requests', protect, getMyClassRequests);

// Route có param động (:id) đ
router.delete('/:id', protect, deleteClassRequest);
router.get('/:id', getClassRequestById);
router.get('/:id/applications', protect, getApplicationsForRequest);
router.put('/application/:appId/accept', protect, acceptTutor);

export default router;