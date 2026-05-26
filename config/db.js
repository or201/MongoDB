import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import "dotenv/config";
import { MongoClient } from "mongodb";

const authors = process.env.AUTHORS_COLLECTION || "authors";
const books = process.env.AUTHORS_BOOKS || "books";

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
    process.exit(1);
  }
};

export const getDB = () => {
  if (!dbConnection) {
    throw new Error("Error to connected DB");
  }
  return dbConnection;
};

export const createIndexes = async () => {
  const db = getDB();

  await db.collection(books).createIndex({
    name: "text",
    description: "text",
  });

  await db.collection(books).createIndex({
    pages: 1,
  });
  console.log("indexes created")
};
