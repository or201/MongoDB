import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import "dotenv/config";
import { MongoClient } from "mongodb";

let dbConnection = null;

export const connectMongoDB = async () => {
  if (dbConnection) return dbConnection;

  try {
    const mongoUri = process.env.MONGO_DB_CONNECTION || "";

    if (!mongoUri) {
      console.log("MONGO_URI is missing in .env file");
      process.exit(1);
    }

    const client = await MongoClient.connect(mongoUri);
    dbConnection = client.db("library");
    console.log("MongoDB Connected Successfully");
    return dbConnection;
  } catch (error) {
    console.log(error);
    // logger.error(`MongoDB connection error: ${err.message}`);
    process.exit(1);
  }
};

export const getDB = () => {
  if (!dbConnection) {
    console.log("error db connectin");
  }
  return dbConnection;
};
