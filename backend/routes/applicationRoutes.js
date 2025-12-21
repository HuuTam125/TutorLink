import express from 'express';
import { applyForClass, getMyApplications, reportIssue } from '../controllers/applicationController.js';
import { protect, tutor } from '../middleware/authMiddleware.js'; // Giả sử bạn đã có middleware admin

const router = express.Router();

router.post('/', protect, tutor, applyForClass); // Gia sư gọi
router.get('/my-applications', protect, tutor, getMyApplications); //Gia sư xem lịch sử
router.post('/:id/report', protect, tutor, reportIssue)
export default router;