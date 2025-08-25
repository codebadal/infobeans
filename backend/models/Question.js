import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
  text: { type: String, required: true },
  type: { type: String, enum: ["mcq", "text"], default: "mcq" },
  options: [{ type: String }],
  // correctAnswer: { type: String }, // stores the correct option
  answer: { type: String }, // stores the correct option
  marks: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model("Question", questionSchema);
