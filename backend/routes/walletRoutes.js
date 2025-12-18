import express from 'express';
import { deposit, payClassFee, getWalletHistory } from '../controllers/walletController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Tất cả đều cần đăng nhập
router.post('/deposit', protect, deposit);
router.post('/pay-class-fee', protect, payClassFee);
router.get('/history', protect, getWalletHistory);

export default router;