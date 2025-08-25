import express from 'express';
import { createBatch, assignStudentToBatch, listBatches } from '../controllers/batch.controller.js';
import { protect, authorizeRoles } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', protect, authorizeRoles('trainer','admin'), createBatch);
router.post('/assign', protect, authorizeRoles('trainer','admin'), assignStudentToBatch);
router.get('/', protect, listBatches);

export default router;
