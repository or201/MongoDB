import "dotenv/config"
import { connectMongoDB } from "./config/db.js";

let db;

connectMongoDB().then((client) => {
  db = client.db("mydb");
});

const createAuthor = async (fName, lName, birth) => {
  const author = {
    fName,
    lName,
    birth,
  };
  await db.collection("authors").insertOne(author);
};

const createBook = async (name, description, author, pages) => {
  const book = {
    name,
    description,
    date: new Date(),
    author,
    pages,
  };
  await db.collection("books").insertOne(book);
};

connectMongoDB();
