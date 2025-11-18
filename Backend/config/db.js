import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://sachikumanayake003:0987654321@cluster0.xpxh5m5.mongodb.net/flowerorderingsystem');
    console.log("db connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); 
  }
};
