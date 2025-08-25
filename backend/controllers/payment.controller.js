import Razorpay from "razorpay";
import Payment from "../models/Payment.js";
import User from "../models/User.js";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

// console.log("KEY_ID:", process.env.RAZORPAY_KEY_ID);
// console.log("KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET);


const razor = new Razorpay({
  
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ Verify payment signature
export const verifyPayment = async (req, res, next) => {
  try {
    const { orderId, paymentId, signature } = req.body;
    const body = orderId + "|" + paymentId;

    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    const payment = await Payment.findOne({ orderId });
    if (!payment) return res.status(400).json({ message: "Order not found" });

    if (expected === signature) {
      payment.paymentId = paymentId;
      payment.signature = signature;
      payment.status = "paid";
      await payment.save();

      // activate user
      const user = await User.findById(payment.user);
      if (user) {
        user.status = "active";
        await user.save();
      }

      res.json({ message: "✅ Payment verified and account activated" });
    } else {
      payment.status = "failed";
      await payment.save();
      res.status(400).json({ message: "❌ Invalid signature" });
    }
  } catch (err) {
    next(err);
  }
};
