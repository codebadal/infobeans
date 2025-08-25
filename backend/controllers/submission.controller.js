import Submission from '../models/Submission.js';
import Question from '../models/Question.js';
import Exam from '../models/Exam.js';
import Batch from '../models/Batch.js';
import User from '../models/User.js';

// Student submits answers: body = { examId, answers: [{ questionId, answer }] }
export const submitExam = async (req, res, next) => {
  try {
    const { examId, answers } = req.body;
    const exam = await Exam.findById(examId);
    if (!exam) return res.status(404).json({ message: 'Exam not found' });

    const questions = await Question.find({ exam: examId });

    // Auto-grade MCQ: sum marks where answer matches (strict string compare)
    let autoScore = 0;
    for (const q of questions) {
      const given = answers.find(a => String(a.questionId) === String(q._id));
      if (!given) continue;
      if (q.type === 'mcq') {
        if (String(q.answer).trim() === String(given.answer).trim()) {
          autoScore += (q.marks || 1);
        }
      }
    }

    const totalScore = autoScore; // manual grading abhi add karna hai
    const passPercent = 60; // pass marks
    const isPass = (totalScore / exam.totalMarks) * 100 >= passPercent;

    const submission = await Submission.create({
      student: req.user._id,
      exam: examId,
      answers,
      autoScore,
      manualScore: 0,
      totalScore,
      isPass,
      status: 'graded'
    });

    // If passed -> try auto-assign to batch of same subject with space
    if (isPass) {
      // find an active batch for subject with capacity
      const batch = await Batch.findOne({ subject: exam.subject, $expr: { $lt: [{ $size: "$students" }, "$capacity"] } });
      if (batch) {
        if (!batch.students.includes(req.user._id)) {
          batch.students.push(req.user._id);
          await batch.save();
        }
      }
    }

    res.status(201).json({ submission, message: isPass ? 'Passed and assigned to batch if available' : 'Submitted' });
  } catch (err) {
    next(err);
  }
};

export const getMySubmissions = async (req, res, next) => {
  try {
    const subs = await Submission.find({ student: req.user._id }).populate('exam');
    res.json(subs);
  } catch (err) {
    next(err);
  }
};
