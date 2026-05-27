import { connectMongoDB, createIndexes } from "./config/db.js";
import { getBooksSorted } from "./services/bookService.js";

const run = async () => {
  try {
    await connectMongoDB();
    await createIndexes();

    // getBookByAuthor("6a16b544a9261dc337b7646a");
    // getBookBySearch("Murder")
    // getBooksSorted();
    
  } catch (error) {
    console.error(error);
  }
};
run();
