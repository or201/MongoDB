import { AUTHORS_COLLECTION } from "../config/constants.js";
import { getDB } from "../config/db.js";
import { authorValidation } from "../validators/authorValidator.js";

export const createAuthor = async (firstName, lastName, birthYear) => {
  try {
    const validation = authorValidation.safeParse({
      firstName,
      lastName,
      birthYear,
    });

    if (!validation.success) {
      const errorMessages = validation.error.errors
        .map((err) => err.message)
        .join(", ");
      throw new Error(errorMessages);
    }

    const db = getDB();
    const author = {
      firstName: validation.data.firstName,
      lastName: validation.data.lastName,
      birthYear: validation.data.birthYear,
    };
    const result = await db.collection(AUTHORS_COLLECTION).insertOne(author);
    return result.insertedId;
  } catch (error) {
    throw error;
  }
};
