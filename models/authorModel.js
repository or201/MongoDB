import { getDB } from "../config/db.js";

const authorsCollection = process.env.AUTHORS_COLLECTION || "authors";

const createAuthor = async (fName, lName, birth) => {
  const db = getDB();

  const author = {
    fName,
    lName,
    birth,
    books: [],
  };
  const result = await db.collection(authorsCollection).insertOne(author);
  console.log("author", author.fName, author.lName, "created");
  return result;
};

export { createAuthor };

