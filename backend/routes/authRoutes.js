import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import { toggleDefenseMode } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/toggle-defense', toggleDefenseMode);
export default router;