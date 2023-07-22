import { z } from "zod";

const imageSchema = z
  .object({
    src: z.string({
      required_error: "Image src is required",
    }),
    alt: z.string({
      required_error: "Image alt is required",
    }),
  })
  .optional();

export const createCommentSchema = z.object({
  content: z.string({
    required_error: "Content is required",
  }),
  image: imageSchema,
});

export const updateCommentSchema = z.object({
  content: z.string().optional(),
  image: imageSchema,
});
