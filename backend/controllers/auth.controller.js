// import bcrypt from 'bcryptjs';
// import { z } from 'zod';
// import User from '../models/User.js';
// import Payment from '../models/Payment.js';
// import { generateToken } from '../utils/token.util.js';
// import Razorpay from 'razorpay';

// const registerSchema = z.object({
//   name: z.string().min(2),
//   email: z.string().email(),
//   mobile: z.string().min(6),
//   password: z.string().min(6)
// });

// // NOTE: Student self-register only. status=pending until payment verified.
// export const register = async (req, res, next) => {
//   try {
//     const parsed = registerSchema.parse(req.body);
//     const { name, email, mobile, password } = parsed;
//     const exists = await User.findOne({ email });
//     if (exists) return res.status(409).json({ message: 'Email already registered' });

//     const salt = await bcrypt.genSalt(10);
//     const hashed = await bcrypt.hash(password, salt);

//     const user = await User.create({ name, email, mobile, password: hashed, role: 'student', status: 'pending' });

//     // Create Razorpay order for ₹100 (INR paise = 10000)
//     const instance = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID,
//       key_secret: process.env.RAZORPAY_KEY_SECRET
//     });

//     // less then 40 error sloving --------------------
//     const shortId = user._id.toString().slice(-8);  // last 8 chars of ObjectId
// const receiptId = `reg_${shortId}_${Date.now().toString().slice(-6)}`;
//     const amount = 100 * 100; // ₹100 in paise
//     const order = await instance.orders.create({
//       amount,
//       currency: 'INR',
//       receipt: receiptId
//     });

//     // store payment record
//     const payment = await Payment.create({
//       user: user._id,
//       amount: 100,
//       currency: 'INR',
//       orderId: order.id,
//       status: 'created'
//     });

//     res.status(201).json({
//       message: 'User created. Complete payment to activate account.',
//       user: { id: user._id, name: user.name, email: user.email, status: user.status },
//       order: { id: order.id, amount: order.amount }
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// const loginSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(6)
// });

// export const login = async (req, res, next) => {
//   try {
//     const { email, password } = loginSchema.parse(req.body);
//     const user = await User.findOne({ email });
//     if (!user) return res.status(401).json({ message: 'Invalid credentials' });
//     const ok = await bcrypt.compare(password, user.password);
//     if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
//     if (user.status !== 'active') return res.status(403).json({ message: 'Account not active' });
//     const token = generateToken(user);
//     res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
//   } catch (err) {
//     next(err);
//   }
// };

// // change password for logged-in user
// export const changePassword = async (req, res, next) => {
//   try {
//     const { oldPassword, newPassword } = req.body;
//     if (!oldPassword || !newPassword) return res.status(400).json({ message: 'Provide old and new password' });
//     const user = await User.findById(req.user._id);
//     const ok = await bcrypt.compare(oldPassword, user.password);
//     if (!ok) return res.status(400).json({ message: 'Old password incorrect' });
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(newPassword, salt);
//     await user.save();
//     res.json({ message: 'Password updated' });
//   } catch (err) {
//     next(err);
//   }
// };

// // Forgot password: generate token + send email
// import crypto from 'crypto';
// import { sendMail } from '../utils/mail.util.js';
// const ResetTokenSchema = z.object({
//   email: z.string().email()
// });

// export const requestPasswordReset = async (req, res, next) => {
//   try {
//     const { email } = ResetTokenSchema.parse(req.body);
//     const user = await User.findOne({ email });
//     if (!user) return res.status(200).json({ message: 'If account exists, reset link will be sent' });

//     const token = crypto.randomBytes(32).toString('hex');
//     // store token and expiry in DB - for simplicity add fields to user (in real app make separate collection)
//     user.resetToken = token;
//     user.resetTokenExpiry = Date.now() + 1000 * 60 * 30; // 30 minutes
//     await user.save();

//     const resetUrl = `${process.env.FRONTEND_URL || ''}/reset-password?token=${token}&id=${user._id}`;
//     await sendMail({
//       to: user.email,
//       subject: 'Password reset - Exam Portal',
//       text: `Reset your password: ${resetUrl}`,
//       html: `<p>Click to reset: <a href="${resetUrl}">Reset password</a></p>`
//     });

//     res.json({ message: 'If account exists, reset link will be sent' });
//   } catch (err) {
//     next(err);
//   }
// };

// const ResetConfirmSchema = z.object({
//   userId: z.string(),
//   token: z.string(),
//   newPassword: z.string().min(6)
// });

// export const confirmPasswordReset = async (req, res, next) => {
//   try {
//     const { userId, token, newPassword } = ResetConfirmSchema.parse(req.body);
//     const user = await User.findById(userId);
//     if (!user || user.resetToken !== token || Date.now() > user.resetTokenExpiry) {
//       return res.status(400).json({ message: 'Invalid or expired token' });
//     }
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(newPassword, salt);
//     user.resetToken = undefined;
//     user.resetTokenExpiry = undefined;
//     await user.save();
//     res.json({ message: 'Password reset successful' });
//   } catch (err) {
//     next(err);
//   }
// };





// otp ------------------------------- 




// import bcrypt from 'bcryptjs';
// import { z } from 'zod';
// import User from '../models/User.js';
// import { generateToken } from '../utils/token.util.js';
// import { sendMail } from '../utils/mail.util.js';

// // ---------- Register ----------
// const registerSchema = z.object({
//   name: z.string().min(2),
//   email: z.string().email(),
//   mobile: z.string().min(6),
//   password: z.string().min(6)
// });

// export const register = async (req, res, next) => {
//   try {
//     const parsed = registerSchema.parse(req.body);
//     const { name, email, mobile, password } = parsed;

//     const exists = await User.findOne({ email });
//     if (exists) return res.status(409).json({ message: 'Email already registered' });

//     const salt = await bcrypt.genSalt(10);
//     const hashed = await bcrypt.hash(password, salt);

//     const user = await User.create({
//       name,
//       email,
//       mobile,
//       password: hashed,
//       role: 'student',
//       status: 'active'
//     });

//     res.status(201).json({
//       message: 'User registered',
//       user: { id: user._id, name: user.name, email: user.email }
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// // ---------- Login ----------
// const loginSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(6)
// });

// export const login = async (req, res, next) => {
//   try {
//     const { email, password } = loginSchema.parse(req.body);
//     const user = await User.findOne({ email });
//     if (!user) return res.status(401).json({ message: 'Invalid credentials' });
//     const ok = await bcrypt.compare(password, user.password);
//     if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
//     if (user.status !== 'active') return res.status(403).json({ message: 'Account not active' });

//     const token = generateToken(user);
//     res.json({
//       token,
//       user: { id: user._id, name: user.name, email: user.email, role: user.role }
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// // ---------- Change password ----------
// export const changePassword = async (req, res, next) => {
//   try {
//     const { oldPassword, newPassword } = req.body;
//     if (!oldPassword || !newPassword) return res.status(400).json({ message: 'Provide old and new password' });

//     const user = await User.findById(req.user._id);
//     const ok = await bcrypt.compare(oldPassword, user.password);
//     if (!ok) return res.status(400).json({ message: 'Old password incorrect' });

//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(newPassword, salt);
//     await user.save();
//     res.json({ message: 'Password updated' });
//   } catch (err) {
//     next(err);
//   }
// };

// // ---------- Forgot password with OTP ----------
// import crypto from 'crypto';
// const ResetOTPSchema = z.object({
//   email: z.string().email()
// });

// export const requestPasswordReset = async (req, res, next) => {
//   try {
//     const { email } = ResetOTPSchema.parse(req.body);
//     const user = await User.findOne({ email });
//     if (!user) return res.status(200).json({ message: 'If account exists, OTP will be sent' });

//     // generate 6-digit OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     user.resetOTP = otp;
//     user.resetOTPExpiry = Date.now() + 1000 * 60 * 10; // valid for 10 min
//     await user.save();

//     await sendMail({
//       to: user.email,
//       subject: 'OTP for Password Reset',
//       html: `<p>Your OTP is: <b>${otp}</b></p><p>Valid for 10 minutes.</p>`
//     });

//     res.json({ message: 'If account exists, OTP will be sent' });
//   } catch (err) {
//     next(err);
//   }
// };

// const ResetConfirmSchema = z.object({
//   email: z.string().email(),
//   otp: z.string().length(6),
//   newPassword: z.string().min(6)
// });

// export const confirmPasswordReset = async (req, res, next) => {
//   try {
//     const { email, otp, newPassword } = ResetConfirmSchema.parse(req.body);
//     const user = await User.findOne({ email });
//     if (!user || user.resetOTP !== otp || Date.now() > user.resetOTPExpiry) {
//       return res.status(400).json({ message: 'Invalid or expired OTP' });
//     }

//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(newPassword, salt);
//     user.resetOTP = undefined;
//     user.resetOTPExpiry = undefined;
//     await user.save();

//     res.json({ message: 'Password reset successful' });
//   } catch (err) {
//     next(err);
//   }
// };


























import bcrypt from 'bcryptjs';
import { z } from 'zod';
import User from '../models/User.js';
import Payment from '../models/Payment.js';
import { generateToken } from '../utils/token.util.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { sendMail } from '../utils/mail.util.js';

// ---------- Register ----------
const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  mobile: z.string().min(6),
  password: z.string().min(6)
});

export const register = async (req, res, next) => {
  try {
    const parsed = registerSchema.parse(req.body);
    const { name, email, mobile, password } = parsed;

    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email already registered' });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    // user create with pending status
    const user = await User.create({
      name,
      email,
      mobile,
      password: hashed,
      role: 'student',
      status: 'pending'
    });

    // Razorpay instance
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    // unique receipt id
    const shortId = user._id.toString().slice(-8);
    const receiptId = `reg_${shortId}_${Date.now().toString().slice(-6)}`;

    const amount = 100 * 100; // ₹100 in paise

    const order = await instance.orders.create({
      amount,
      currency: 'INR',
      receipt: receiptId
    });

    // save payment record
    await Payment.create({
      user: user._id,
      amount: 100,
      currency: 'INR',
      orderId: order.id,
      status: 'created'
    });

    res.status(201).json({
      message: 'User created. Complete payment to activate account.',
      user: { id: user._id, name: user.name, email: user.email, status: user.status },
      order: { id: order.id, amount: order.amount, currency: order.currency }
    });
  } catch (err) {
    next(err);
  }
};

// ---------- Login ----------
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const login = async (req, res, next) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    if (user.status !== 'active') {
      return res.status(403).json({ message: 'Account not active. Complete payment first.' });
    }

    const token = generateToken(user);
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    next(err);
  }
};

// ---------- Change Password ----------
export const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) return res.status(400).json({ message: 'Provide old and new password' });

    const user = await User.findById(req.user._id);
    const ok = await bcrypt.compare(oldPassword, user.password);
    if (!ok) return res.status(400).json({ message: 'Old password incorrect' });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.json({ message: 'Password updated' });
  } catch (err) {
    next(err);
  }
};

// ---------- Forgot Password (OTP) ----------
const ResetOTPSchema = z.object({
  email: z.string().email()
});

export const requestPasswordReset = async (req, res, next) => {
  try {
    const { email } = ResetOTPSchema.parse(req.body);
    const user = await User.findOne({ email });
    if (!user) return res.status(200).json({ message: 'If account exists, OTP will be sent' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetOTP = otp;
    user.resetOTPExpiry = Date.now() + 1000 * 60 * 10;
    await user.save();

    await sendMail({
      to: user.email,
      subject: 'OTP for Password Reset',
      html: `<p>Your OTP is: <b>${otp}</b></p><p>Valid for 10 minutes.</p>`
    });

    res.json({ message: 'If account exists, OTP will be sent' });
  } catch (err) {
    next(err);
  }
};

const ResetConfirmSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6),
  newPassword: z.string().min(6)
});

export const confirmPasswordReset = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = ResetConfirmSchema.parse(req.body);
    const user = await User.findOne({ email });
    if (!user || user.resetOTP !== otp || Date.now() > user.resetOTPExpiry) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetOTP = undefined;
    user.resetOTPExpiry = undefined;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    next(err);
  }
};
