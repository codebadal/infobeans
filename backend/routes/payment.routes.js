import express from 'express';
import { verifyPayment } from '../controllers/payment.controller.js';

const router = express.Router();

// client will post orderId, paymentId, signature after checkout
router.post('/verify', verifyPayment);

// razorpay webhook endpoint (set this url in razorpay dashboard)
// ----------------- hata raha abhi ke liye 
// router.post('/webhook', express.raw({ type: 'application/json' }), webhook); 


export default router;
