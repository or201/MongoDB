import { ObjectId } from "mongodb";
import { z } from "zod";

export const bookValidation = z.object({
  name: z.string().trim().min(2, "name must be at least 2 chars"),

  description: z.string().trim().min(2, "description must be at least 2 chars"),

  publicationDateYear: z
    .number()
    .min(1800, "year must be equal 4 digits")
    .max(2226, "year must be equal 4 digits"),

  authorId: z
    .string()
    .length(24, "authorId must be 24 chars")
    .refine((val) => ObjectId.isValid(val), {
      message: "authorId must be a valid hex-encoded MongoDB ObjectId",
    }),

  pages: z
    .number()
    .min(1, "pages must be between 1-10000")
    .max(10000, "pages must be between 1-10000"),
});
