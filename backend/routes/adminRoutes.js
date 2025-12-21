import express from 'express';
import {
  getAllUsers,
  getPendingTutors,
  approveTutor,
  deleteUser,
  getPendingClassRequests,
  getTutorProfileById,
  processRefund,
  getAllTransactions,
  dismissReport,
  getMatchedClasses,
  getPendingReports,
  approveClassRequest
} from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Tất cả các route dưới đây đều cần Login (protect) VÀ quyền Admin (admin)
router.get('/users', protect, admin, getAllUsers);
router.delete('/users/:id', protect, admin, deleteUser);

router.get('/tutors-pending', protect, admin, getPendingTutors);
router.put('/approve-tutor/:id', protect, admin, approveTutor);
router.get('/tutors-profile/:id', protect, admin, getTutorProfileById);


router.get('/requests-pending', protect, admin, getPendingClassRequests);
router.put('/approve-request/:id', protect, admin, approveClassRequest);

router.get('/matched-classes', protect, admin, getMatchedClasses);
router.get('/reports', protect, admin, getPendingReports);

router.get('/transactions', protect, admin, getAllTransactions); // Tab Transactions
router.post('/refund', protect, admin, processRefund);           // Action Hoàn tiền
router.put('/applications/:id/resolve-report', protect, admin, dismissReport); // Action Từ chối

export default router;