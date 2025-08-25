import User from '../models/User.js';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

// admin: list users, get, update, delete, create trainer/admin
export const listUsers = async (req, res, next) => {
  try {
    const role = req.query.role;
    const filter = role ? { role } : {};
    const users = await User.find(filter).select('-password');
    res.json(users);
  } catch (err) { next(err); }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) { next(err); }
};

const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  mobile: z.string().min(6),
  password: z.string().min(6).optional(),
  role: z.enum(['student','trainer','admin'])
});

export const createUser = async (req, res, next) => {
  try {
    const body = createUserSchema.parse(req.body);
    const exists = await User.findOne({ email: body.email });
    if (exists) return res.status(409).json({ message: 'Email exists' });
    const pw = body.password || 'Pass@123';
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(pw, salt);
    const status = body.role === 'student' ? 'active' : 'active';
    const user = await User.create({ name: body.name, email: body.email, mobile: body.mobile, password: hashed, role: body.role, status });
    res.status(201).json({ message: 'User created', user });
  } catch (err) { next(err); }
};

export const updateUser = async (req, res, next) => {
  try {
    const { name, mobile, role, status } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (name) user.name = name;
    if (mobile) user.mobile = mobile;
    if (role) user.role = role;
    if (status) user.status = status;
    await user.save();
    res.json({ message: 'Updated', user });
  } catch (err) { next(err); }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};
