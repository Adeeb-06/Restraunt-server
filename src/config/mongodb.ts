import mongoose from "mongoose";

export const connectToDatabase = async () => {
  const MONGO_URI = process.env.MONGO_URI;
  if (!MONGO_URI) {
    throw new Error("MONGO_URI is not defined in environment variables");
  }

  try {
    const connection = await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB:", connection.connection.host);
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};
