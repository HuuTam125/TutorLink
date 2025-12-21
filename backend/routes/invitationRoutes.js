import express from 'express';
import { sendInvitation, getMyInvitations } from '../controllers/invitationController.js';
import { protect, student } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, student, sendInvitation); // Gửi
router.get('/my-invitations', protect, getMyInvitations); // Xem

export default router;