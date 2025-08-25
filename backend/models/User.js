import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student','trainer','admin'], default: 'student' },
  status: { type: String, enum: ['pending','active','blocked'], default: 'pending' }, // default pending until payment verified for students

  resetOTP: { type: String }, // 6-digit OTP
  resetOTPExpiry: { type: Date } // expiry time
}, { timestamps: true });

export default mongoose.model('User', userSchema);
