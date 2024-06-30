import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_DB_URI}/quiz`);
    console.log(`MongoDB connected`);
  } catch (error) {
    console.log(`MongoDB connection failed: ${error.message}`);
  }
};
