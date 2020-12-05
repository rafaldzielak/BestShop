import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`MongoDB connected: + ${connection.connection.host}`.green.bold);
  } catch (error) {
    console.log("Failed to connect to MongoDB: " + error);
    process.exit(1);
  }
};

export default connectDB;
