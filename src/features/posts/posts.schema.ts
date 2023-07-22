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
  .array()
  .optional();

export const createPostSchema = z.object({
  content: z.string({
    required_error: "Content is required",
  }),
  images: imageSchema,
});

export const updatePostSchema = z.object({
  content: z.string().optional(),
  images: imageSchema,
});
