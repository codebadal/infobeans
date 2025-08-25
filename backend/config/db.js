import mongoose from 'mongoose';

 const connectDB = async () => {
 try {
   const url = process.env.MONGO_URI;
  await mongoose.connect(url);
  console.log('Mongo connected');
 } catch (error) {
  console.log("connection error" + error);
 }
};
export default connectDB;