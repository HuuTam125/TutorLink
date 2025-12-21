import express from 'express';
import { getWalletHistory, createPaymentLink, confirmPaymentOnMobile, checkTransactionStatus } from '../controllers/walletController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();


router.get('/history', protect, getWalletHistory);
// Route tạo QR (Cần đăng nhập)
router.post('/create-payment-link', protect, createPaymentLink);

// Route xử lý khi quét (PUBLIC - Không cần protect vì điện thoại quét ko có token)
router.get('/confirm-payment/:id', confirmPaymentOnMobile);

// Route check trạng thái
router.get('/check-status/:id', protect, checkTransactionStatus);


export default router;