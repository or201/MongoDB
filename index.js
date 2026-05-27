import { connectMongoDB, createIndexes } from "./config/db.js";
import { createAuthor } from "./models/authorModel.js";
import { createBook } from "./models/bookModel.js";
import { getBookByAuthor } from "./services/bookService.js";

const run = async () => {
  try {
    await connectMongoDB();
    await createIndexes();

    // getBookByAuthor("6a16b544a9261dc337b7646a");

  

  } catch (error) {
    console.error(error);
  }
};
run();
