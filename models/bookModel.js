import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";

const booksCollection = process.env.AUTHORS_BOOKS || "books";
const authorsCollection = process.env.AUTHORS_COLLECTION || "authors";

const createBook = async (name, description, authorID, pages) => {
  const db = getDB();

  const book = {
    name,
    description,
    date: new Date(),
    authorID: new ObjectId(authorID),
    pages,
  };

  await db.collection(booksCollection).insertOne(book);
  await db
    .collection(authorsCollection)
    .updateOne({ _id: new ObjectId(authorID) }, { $push: { books: book } });
  console.log("book", book.name, "created");
};

export { createBook };
