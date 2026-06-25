import "dotenv/config";

export const AUTHORS_COLLECTION = process.env.AUTHORS_COLLECTION || "authors";
export const BOOKS_COLLECTION = process.env.BOOKS_COLLECTION || "books";
export const DB_NAME = process.env.DB_NAME || "library";
export const MONGO_URI = process.env.MONGO_DB_CONNECTION || "";
