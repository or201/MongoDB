import { closeMongoDB, connectMongoDB, createIndexes } from "./config/db.js";

const run = async () => {
  try {
    await connectMongoDB();
    await createIndexes();

    await closeMongoDB();
  } catch (error) {
    console.error(error);
    await closeMongoDB();
    process.exit(1);
  }
};
run();
