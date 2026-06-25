import { ObjectId } from "mongodb";
import { AUTHORS_COLLECTION, BOOKS_COLLECTION } from "../config/constants.js";
import { getDB } from "../config/db.js";
import { bookValidation } from "../validators/bookValidator.js";

export const createBook = async (
  name,
  description,
  publicationDateYear,
  authorId,
  pages,
) => {
  try {
    const validation = bookValidation.safeParse({
      name,
      description,
      publicationDateYear,
      authorId,
      pages,
    });

    if (!validation.success) {
      const errorMessages = validation.error.errors
        .map((err) => err.message)
        .join(", ");
      throw new Error(errorMessages);
    }

    const db = getDB();

    const findAuthor = await db.collection(AUTHORS_COLLECTION).findOne({
      _id: new ObjectId(validation.data.authorId),
    });

    if (!findAuthor) {
      throw new Error(
        `Failed to create book: Author with ID ${authorId} does not exist.`,
      );
    }

    const book = {
      name: validation.data.name,
      description: validation.data.description,
      publicationDateYear: validation.data.publicationDateYear,
      authorId: new ObjectId(validation.data.authorId),
      pages: validation.data.pages,
    };

    const result = await db.collection(BOOKS_COLLECTION).insertOne(book);
    return result.insertedId;
  } catch (error) {
    throw error;
  }
};

export const getBooksByAuthor = async (authorId) => {
  try {
    const db = getDB();

    if (!ObjectId.isValid(authorId)) {
      console.log("Invalid author ID format");
      return null;
    }

    const authorExists = await db.collection(AUTHORS_COLLECTION).findOne({
      _id: new ObjectId(authorId),
    });

    if (!authorExists) {
      return null;
    }

    const authorBooks = await db
      .collection(BOOKS_COLLECTION)
      .find({ authorId: new ObjectId(authorId) })
      .toArray();

    return authorBooks;
  } catch (error) {
    throw error;
  }
};

export const getBookBySearch = async (searchTerm, limit = 10) => {
  try {
    if (
      !searchTerm ||
      typeof searchTerm !== "string" ||
      searchTerm.trim() === ""
    ) {
      console.log("Search term is empty or invalid");
      return [];
    }

    let finalLimit = parseInt(limit, 10);

    if (isNaN(finalLimit) || finalLimit <= 0) {
      finalLimit = 10;
    }

    const db = getDB();
    const result = await db
      .collection(BOOKS_COLLECTION)
      .find({ $text: { $search: searchTerm.trim() } })
      .limit(finalLimit)
      .toArray();

    console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
};

export const getBooksByMinimumPages = async (minPages = 250) => {
  try {
    let finalMinPages = parseInt(minPages, 10);
    if (isNaN(finalMinPages) || finalMinPages <= 0) {
      finalMinPages = 250;
    }

    const db = getDB();
    const result = await db
      .collection(BOOKS_COLLECTION)
      .find({ pages: { $gt: finalMinPages } })
      .sort({ pages: 1 })
      .toArray();

    console.log(result);
    return result;
  } catch (error) {
    throw error;
  }
};
