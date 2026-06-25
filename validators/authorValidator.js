import { z } from "zod";

export const authorValidation = z.object({
  firstName: z.string().trim().min(2, "first name must be at least 2 chars"),

  lastName: z.string().trim().min(2, "last name must be at least 2 chars"),

  birthYear: z
    .number()
    .min(1800, "year must be equal 4 digits")
    .max(2226, "year must be equal 4 digits"),
});
