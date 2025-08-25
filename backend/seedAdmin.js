import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";   // make sure correct path

dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        // check if admin already exists
        const existing = await User.findOne({ role: "admin" });
        if (existing) {
            console.log("⚠️ Admin already exists:", existing.email);
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash("badal@123", 10);

        const admin = new User({
            name: "badal patel",
            email: "badal@gmail.com",
            mobile: "9826750610",
            password: hashedPassword,
            role: "admin",
            status: "active",
        });

        await admin.save();
        console.log("✅ Admin created successfully:", admin.email);
        process.exit(0);
    } catch (err) {
        console.error("❌ Error seeding admin:", err);
        process.exit(1);
    }
};

createAdmin();
