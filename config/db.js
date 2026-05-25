import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import "dotenv/config";
import { MongoClient } from "mongodb";
// import logger from "../utils/logger";

export const connectMongoDB = async () => {
  try {
    const mongoUri = process.env.MONGO_DB_CONNECTION || "";

    if (!mongoUri) {
      // logger.error("MONGO_URI is missing in .env file");
      process.exit(1);
    }

    await MongoClient.connect(mongoUri);
    console.log("MongoDB Connected Successfully");
    // logger.info("MongoDB Connected Successfully");
  } catch (error) {
    console.log(error);
    // logger.error(`MongoDB connection error: ${err.message}`);
    process.exit(1);
  }
};
