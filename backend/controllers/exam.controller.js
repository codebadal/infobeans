// import { z } from 'zod';
// import Exam from '../models/Exam.js';

// const examSchema = z.object({
//   title: z.string().min(2),
//   subject: z.string().optional(),
//   description: z.string().optional(),
//   scheduledAt: z.string().optional(),
//   durationMins: z.number().optional(),
//   totalMarks: z.number().optional()
// });

// export const createExam = async (req, res, next) => {
//   try {
//     const data = examSchema.parse(req.body);
//     const exam = await Exam.create({ ...data, createdBy: req.user._id, status: 'scheduled' });
//     res.status(201).json(exam);
//   } catch (err) {
//     next(err);
//   }
// };

// export const listExams = async (req, res, next) => {
//   try {
//     const exams = await Exam.find().populate('createdBy', 'name email role');
//     res.json(exams);
//   } catch (err) {
//     next(err);
//   }
// };
// export const deleteExam = async (req, res, next) => {
//   try {
//     await Exam.findOneAndDelete({ _id: req.params.id, trainer: req.user._id });
//     res.json({ message: "Exam deleted" });
//   } catch (err) {
//     next(err);
//   }
// };
// export const toggleExamLive = async (req, res, next) => {
//   try {
//     const exam = await Exam.findOne({ _id: req.params.id, trainer: req.user._id });
//     exam.isLive = !exam.isLive;
//     await exam.save();
//     res.json({ message: `Exam is now ${exam.isLive ? "LIVE" : "UNLIVE"}` });
//   } catch (err) {
//     next(err);
//   }
// };




























import { z } from 'zod';
import Exam from '../models/Exam.js';

const examSchema = z.object({
  title: z.string().min(2),
  subject: z.string().optional(),
  description: z.string().optional(),
  scheduledAt: z.string().optional(),
  durationMins: z.number().optional(),
  totalMarks: z.number().optional()
});

// Create Exam
export const createExam = async (req, res, next) => {
  try {
    const data = examSchema.parse(req.body);
    const exam = await Exam.create({
      ...data,
      createdBy: req.user._id,
      status: 'scheduled',
      isLive: false // default not live
    });
    res.status(201).json(exam);
  } catch (err) {
    next(err);
  }
};

// List Exams
export const listExams = async (req, res, next) => {
  try {
    const exams = await Exam.find().populate('createdBy', 'name email role');
    res.json(exams);
  } catch (err) {
    next(err);
  }
};

// Delete Exam
export const deleteExam = async (req, res, next) => {
  try {
    const exam = await Exam.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id // ✅ FIX
    });
    if (!exam) return res.status(404).json({ message: 'Exam not found or not allowed' });
    res.json({ message: 'Exam deleted' });
  } catch (err) {
    next(err);
  }
};

// Toggle Exam Live/Unlive
export const toggleExamLive = async (req, res, next) => {
  try {
    const exam = await Exam.findOne({
      _id: req.params.id,
      createdBy: req.user._id // ✅ FIX
    });
    if (!exam) return res.status(404).json({ message: 'Exam not found or not allowed' });

    exam.isLive = !exam.isLive;
    await exam.save();

    res.json({ message: `Exam is now ${exam.isLive ? 'LIVE' : 'UNLIVE'}`, exam });
  } catch (err) {
    next(err);
  }
};
