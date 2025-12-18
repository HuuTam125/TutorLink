import express from 'express';
import { applyForClass, getMyApplications } from '../controllers/applicationController.js';
import { protect } from '../middleware/authMiddleware.js'; // Giả sử bạn đã có middleware admin

const router = express.Router();

router.post('/', protect, applyForClass); // Gia sư gọi
router.get('/my-applications', protect, getMyApplications); //Gia sư xem lịch sử

export default router;