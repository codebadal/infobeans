import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './config/db.js';

import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';
import examRoutes from './routes/exam.routes.js';
import questionRoutes from './routes/question.routes.js';
import submissionRoutes from './routes/submission.routes.js';
import batchRoutes from './routes/batch.routes.js';
import paymentRoutes from './routes/payment.routes.js';

import { errorHandler } from './middleware/error.middleware.js';

dotenv.config();
connectDB();

const app = express();
// app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(cors())

// app.use(cors({
//   origin: "http://localhost:5173",
//   methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));

// app.options("*", cors());

app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/batches', batchRoutes);
app.use('/api/payments', paymentRoutes);

// root
app.get('/', (req, res) => res.send('Exam Portal API'));

// error handler (should be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
