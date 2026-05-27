import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";

const authorsCollection = process.env.AUTHORS_COLLECTION || "authors";
const booksCollection = process.env.AUTHORS_BOOKS || "books";

//task 1
export const getBookByAuthor = async (authorID) => {
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

//task 1
export const getBookBySearch = async (SearchTerm) => {
  const db = getDB();
  const result = await db
    .collection(booksCollection)
    .find({ $text: { $search: SearchTerm } })
    .toArray();

  console.log(result);
  return result;
};

//task 1
export const getBooksSorted = async () => {
  const db = getDB();
  const result = await db
    .collection(booksCollection)
    .find({ pages: { $gt: 250 } })
    .sort({ pages: 1 })
    .toArray();

  console.log(result);
  return result;
};
