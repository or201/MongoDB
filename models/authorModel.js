import "dotenv/config";
import { getDB } from "../config/db.js";

const collection = process.env.AUTHORS_COLLECTION || "authors";

const createAuthor = async (fName, lName, birth) => {
  const db = getDB();

  const author = {
    fName,
    lName,
    birth,
    books: [],
  };
  const result = await db.collection(collection).insertOne(author);
  console.log("author", author.fName, author.lName, "created");
  return result;
};

export { createAuthor };
