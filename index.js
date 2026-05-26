import { connectMongoDB } from "./config/db.js";
import { createAuthor } from "./models/authorModel.js";
import { createBook } from "./models/bookModel.js";

const run = async () => {
  try {
    await connectMongoDB();
    await createBook(
      "H.P. 3",
      "lorem10 lorem10 lorem10 lorem10 lorem10 lorem10 ",
      "J.K.R",
      100,
    );
    await createAuthor("J.", "K.R", 1990);
  } catch (error) {}
};
run();
