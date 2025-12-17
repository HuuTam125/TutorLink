import express from 'express';
import { applyForClass } from '../controllers/applicationController.js';
import { protect } from '../middleware/authMiddleware.js'; // Giả sử bạn đã có middleware admin

const router = express.Router();

router.post('/', protect, applyForClass); // Gia sư gọi

export default router;