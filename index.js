import { connectMongoDB, createIndexes } from "./config/db.js";
import { createAuthor } from "./models/authorModel.js";
import { createBook } from "./models/bookModel.js";

const run = async () => {
  try {
    await connectMongoDB();
    await createIndexes()
   const author =  await createAuthor("J.", "K.R", 1990);
    await createBook(
      "H.P. 3",
      "lorem10 lorem10 lorem10 lorem10 lorem10 lorem10 ",
      author.insertedId,
      100,
    );
  } catch (error) {}
};
run();
