import { Gender } from "@prisma/client";
import { z } from "zod";

export const updateProfileSchema = z.object({
  bio: z
    .string({
      invalid_type_error: "Bio must be a string",
    })
    .optional(),
  dob: z
    .string()
    .transform((str) => new Date(str))
    .optional(),
  gender: z.enum([Gender.MALE, Gender.FEMALE]).optional(),
});
