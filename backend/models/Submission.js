import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  answers: [{ questionId: mongoose.Schema.Types.ObjectId, answer: String }],
  autoScore: { type: Number, default: 0 },
  manualScore: { type: Number, default: 0 },
  totalScore: { type: Number, default: 0 },
  isPass: { type: Boolean, default: false },
  status: { type: String, enum: ['inprogress','submitted','graded'], default: 'submitted' }
}, { timestamps: true });

export default mongoose.model('Submission', submissionSchema);
