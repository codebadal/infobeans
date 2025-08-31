// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   mobile: { type: String, required: true},
//   password: { type: String, required: true },
//   role: { type: String, enum: ['student','trainer','admin'], default: 'student' },
//   status: { type: String, enum: ['pending','active','blocked'], default: 'pending' }, // default pending until payment verified for students

//   resetOTP: { type: String }, // 6-digit OTP
//   resetOTPExpiry: { type: Date } // expiry time
// }, { timestamps: true });

// export default mongoose.model('User', userSchema);








import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student','trainer','admin'], default: 'student' },
  status: { 
    type: String, 
    enum: ['pending','email-verified','active','blocked'], 
    default: 'pending' 
  }, 
  // 'pending' → registered but not verified
  // 'email-verified' → OTP verified but not paid yet
  // 'active' → payment successful

  // forgot password OTP
  resetOTP: { type: String },
  resetOTPExpiry: { type: Date },

  // email verification OTP
  emailOTP: { type: String },
  emailOTPExpiry: { type: Date },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
