import { MongoClient } from "mongodb";
import { BOOKS_COLLECTION, DB_NAME, MONGO_URI } from "./constants.js";

let dbConnection = null;
let connectionPromise = null;

export const connectMongoDB = async () => {
  if (dbConnection) return dbConnection.db;

  if (connectionPromise) {
    const client = await connectionPromise;
    return client.db(DB_NAME);
  }

  try {
    if (!MONGO_URI) {
      throw new Error("MONGO_DB_CONNECTION is missing in .env file");
    }

    const client = new MongoClient(MONGO_URI);
    connectionPromise = client.connect();
    await connectionPromise;

    dbConnection = {
      db: client.db(DB_NAME),
      client: client,
    };

    console.log("MongoDB Connected Successfully");
    connectionPromise = null;
    return dbConnection.db;
  } catch (error) {
    console.error(error);

    connectionPromise = null;
    throw new Error("Failed to connect to mongoDB", { cause: error });
  }
};

export const getDB = () => {
  if (!dbConnection) {
    throw new Error("Failed to get database connection");
  }
  return dbConnection.db;
};

export const createIndexes = async () => {
  const db = getDB();
  await db.collection(BOOKS_COLLECTION).createIndex({
    name: "text",
    description: "text",
  });

  await db.collection(BOOKS_COLLECTION).createIndex({
    pages: 1,
  });

  await db.collection(BOOKS_COLLECTION).createIndex({
    authorId: 1,
  });

  console.log("indexes created");
};

export const closeMongoDB = async () => {
  if (dbConnection && dbConnection.client) {
    await dbConnection.client.close();
    console.log("MongoDB Connection Closed");
    dbConnection = null;
  }
};
