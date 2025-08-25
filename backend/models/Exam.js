import mongoose from 'mongoose';

const examSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subject: String,
  description: String,
  scheduledAt: Date,
  durationMins: Number,
  totalMarks: Number,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['scheduled','completed'], default: 'scheduled' },
  isLive: { type: Boolean, default: false } // 👈 Add this
}, { timestamps: true });

export default mongoose.model('Exam', examSchema);
