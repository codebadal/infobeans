// import express from 'express';
// import { createExam, listExams } from '../controllers/exam.controller.js';
// import { protect, authorizeRoles } from '../middleware/auth.middleware.js';

// const router = express.Router();

// router.post('/', protect, authorizeRoles('trainer','admin'), createExam);
// router.get('/', protect, listExams);

// export default router;























import express from 'express';
import { 
  createExam, 
  listExams, 
  deleteExam, 
  toggleExamLive 
} from '../controllers/exam.controller.js';
import { protect, authorizeRoles } from '../middleware/auth.middleware.js';

const router = express.Router();

// Create exam (trainer/admin only)
router.post('/', protect, authorizeRoles('trainer','admin'), createExam);

// List exams (all roles can view, filtering happens in controller)
router.get('/', protect, listExams);

// Delete exam (trainer/admin only)
router.delete('/:id', protect, authorizeRoles('trainer','admin'), deleteExam);

// Toggle exam live/unlive (trainer/admin only)
router.put('/:id/toggle-live', protect, authorizeRoles('trainer','admin'), toggleExamLive);

export default router;
 