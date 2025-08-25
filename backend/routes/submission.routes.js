import express from 'express';
import { submitExam, getMySubmissions } from '../controllers/submission.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', protect, submitExam);
router.get('/me', protect, getMySubmissions);

export default router;
