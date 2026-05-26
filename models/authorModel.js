import "dotenv/config";
import { getDB } from "../config/db.js";

const collection = process.env.AUTHORS_COLLECTION || "authors";

const createAuthor = async (fName, lName, birth) => {
  const db = getDB();

  const author = {
    fName,
    lName,
    birth,
  };
  await db.collection(collection).insertOne(author);
};

export { createAuthor };
