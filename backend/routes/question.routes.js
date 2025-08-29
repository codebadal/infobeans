// import express from 'express';
// import { addQuestion, getQuestionsForExam } from '../controllers/question.controller.js';
// import { protect, authorizeRoles } from '../middleware/auth.middleware.js';

// const router = express.Router();

// router.post('/', protect, authorizeRoles('trainer','admin'), addQuestion);
// router.get('/exam/:examId', protect, getQuestionsForExam);

// export default router;




import express from 'express';
import {
  addQuestion,
  getQuestionsForExam,
  updateQuestion,
  deleteQuestion
} from '../controllers/question.controller.js';
import { protect, authorizeRoles } from '../middleware/auth.middleware.js';

const router = express.Router();

// Trainer/Admin can add question
router.post('/', protect, authorizeRoles('trainer', 'admin'), addQuestion);

// Get all questions of an exam (students won't see answers in controller)
router.get('/exam/:examId', protect, getQuestionsForExam);

// Update a question 
router.put('/:id', protect, authorizeRoles('trainer', 'admin'), updateQuestion);

// Delete a question
router.delete('/:id', protect, authorizeRoles('trainer', 'admin'), deleteQuestion);

export default router;
