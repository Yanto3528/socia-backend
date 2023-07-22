import z from "zod";
import { Prisma } from "@prisma/client";

import { createCommentSchema, updateCommentSchema } from "./comments.schema";

export type CreateCommentPayload = z.infer<typeof createCommentSchema>;
export type UpdateCommentPayload = z.infer<typeof updateCommentSchema>;

export type CreateCommentDto = Prisma.CommentCreateArgs["data"];
export type UpdateCommentDto = Prisma.CommentUpdateArgs["data"];
