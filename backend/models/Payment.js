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
