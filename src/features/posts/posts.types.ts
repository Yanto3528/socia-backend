import z from "zod";
import { Prisma } from "@prisma/client";

import { createPostSchema, updatePostSchema } from "./posts.schema";

export type CreatePostDto = Prisma.PostCreateArgs["data"];
export type UpdatePostDto = Prisma.PostUpdateArgs["data"];

export type CreatePostPayload = z.infer<typeof createPostSchema>;
export type UpdatePostPayload = z.infer<typeof updatePostSchema>;
