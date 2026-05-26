import "dotenv/config";
import { getDB } from "../config/db.js";

const collection = process.env.AUTHORS_BOOKS || "books";

const createBook = async (name, description, author, pages) => {
  const db = getDB();

  const book = {
    name,
    description,
    date: new Date(),
    author,
    pages,
  };

  await db.collection(collection).insertOne(book);
  console.log("book", book.name, "created");
};

export { createBook };
