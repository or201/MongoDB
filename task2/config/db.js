import mongoose from "mongoose";
import "dotenv/config";


const url = `${process.env.MONGO_DB_CONNECTION}/library`;

export const connectMongoDB2 = async () => {
  try {
    await mongoose.connect(url);
    console.log("DB connected")
  } catch (error) {
    console.error(error);
  }
};
