import Batch from '../models/Batch.js';
import User from '../models/User.js';

// admin/trainer creates batch
export const createBatch = async (req, res, next) => {
  try {
    const { name, subject, capacity, trainerId } = req.body;
    const trainer = trainerId || (req.user.role === 'trainer' ? req.user._id : null);
    const batch = await Batch.create({ name, subject, capacity: capacity || 30, trainer });
    res.status(201).json(batch);
  } catch (err) {
    next(err);
  }
};

export const assignStudentToBatch = async (req, res, next) => {
  try {
    const { batchId, studentId } = req.body;
    const batch = await Batch.findById(batchId);
    if (!batch) return res.status(404).json({ message: 'Batch not found' });
    if (batch.students.length >= batch.capacity) return res.status(400).json({ message: 'Batch full' });
    if (!batch.students.includes(studentId)) {
      batch.students.push(studentId);
      await batch.save();
    }
    res.json(batch);
  } catch (err) {
    next(err);
  }
};

export const listBatches = async (req, res, next) => {
  try {
    const batches = await Batch.find().populate('students', 'name email').populate('trainer', 'name email');
    res.json(batches);
  } catch (err) {
    next(err);
  }
};
