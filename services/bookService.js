import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";

const authorsCollection = process.env.AUTHORS_COLLECTION || "authors";
const booksCollection = process.env.AUTHORS_BOOKS || "books";

export const  = async (authorID) => {
  const db = getDB();

  const author = await db.collection(authorsCollection).findOne({
    _id: new ObjectId(authorID),
  });

  if (!author) {
    console.log("author not found");
    return [];
  }

  console.log(author.books);
  return author.books;
};

export const getBookBySearch = async () => {

};

export const getBooksSorted = async () => {};
