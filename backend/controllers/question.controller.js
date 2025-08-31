import { z } from "zod";
import Question from "../models/Question.js";
import Exam from "../models/Exam.js";

const questionSchema = z.object({
  examId: z.string(),
  text: z.string().min(2),
  type: z.enum(["mcq", "subjective"]).optional(),
  options: z.array(z.string()).optional(),
  answer: z.string().optional(),
  marks: z.number().optional(),
});

// Add Question
export const addQuestion = async (req, res, next) => {
  try {
    const payload = questionSchema.parse(req.body);
    const exam = await Exam.findById(payload.examId);
    if (!exam) return res.status(404).json({ message: "Exam not found" });

    // only trainer who created exam or admin allowed
    if (
      req.user.role === "trainer" &&
      String(exam.createdBy) !== String(req.user._id)
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const q = await Question.create({
      exam: payload.examId,
      text: payload.text,
      type: payload.type || "mcq",
      options: payload.options || [],
      answer: payload.answer || "",
      marks: payload.marks || 1,
    });

    res.status(201).json(q);
  } catch (err) {
    next(err);
  }
};

// Get Questions for Exam
export const getQuestionsForExam = async (req, res, next) => {
  try {
    const { examId } = req.params;

    // students should not see correct answer
    let projection = {};
    if (req.user.role === "student") projection.answer = 0;

    const questions = await Question.find({ exam: examId }).select(projection);
    res.json(questions);
  } catch (err) {
    next(err);
  }
};

// Update Question
export const updateQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const q = await Question.findById(id).populate("exam");
    if (!q) return res.status(404).json({ message: "Question not found" });

    // only trainer who created exam or admin allowed
    if (
      req.user.role === "trainer" &&
      String(q.exam.createdBy) !== String(req.user._id)
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const updates = req.body;
    if (updates.options && !Array.isArray(updates.options)) {
      return res.status(400).json({ message: "Options must be an array" });
    }

    Object.assign(q, updates);
    await q.save();

    res.json(q);
  } catch (err) {
    next(err);
  }
};

// Delete Question
export const deleteQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const q = await Question.findById(id).populate("exam");
    if (!q) return res.status(404).json({ message: "Question not found" });

    if (
      req.user.role === "trainer" &&
      String(q.exam.createdBy) !== String(req.user._id)
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await q.deleteOne();
    res.json({ message: "Question deleted" });
  } catch (err) {
    next(err);
  }
};
