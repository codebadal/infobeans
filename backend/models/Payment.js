import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  orderId: String, // razorpay order id
  paymentId: String, // razorpay payment id
  signature: String,
  status: { type: String, enum: ['created','paid','failed'], default: 'created' }
}, { timestamps: true });

export default mongoose.model('Payment', paymentSchema);



// User 1 ───< Batch (trainer)
// User * ───< Batch.students
// User 1 ───< Exam.createdBy
// User 1 ───< Payment.user
// User 1 ───< Submission.student

// Exam 1 ───< Question.exam
// Exam 1 ───< Submission.exam
