// import express from 'express';
// import {
//   register, login, changePassword, requestPasswordReset, confirmPasswordReset
// } from '../controllers/auth.controller.js';
// import { protect } from '../middleware/auth.middleware.js';

// const router = express.Router(); 

// router.post('/register', register); // student-only register (creates payment order)
// router.post('/login', login);
// router.post('/change-password', protect, changePassword);
// router.post('/forgot', requestPasswordReset);
// // router.post('/reset', confirmPasswordReset);
// router.post('/reset-otp', confirmPasswordReset);

// export default router;







import express from 'express';
import {
  register,
  login,
  changePassword,
  requestPasswordReset,
  confirmPasswordReset,
  verifyEmail   // ✅ add this
} from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router(); 

router.post('/register', register);
router.post('/verify-email', verifyEmail);   // ✅ new route for OTP verification
router.post('/login', login);
router.post('/change-password', protect, changePassword);
router.post('/forgot', requestPasswordReset);
router.post('/reset-otp', confirmPasswordReset);

export default router;

