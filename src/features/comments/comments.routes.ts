import express from "express";

import { requireAuth, validateBody } from "@/middlewares";

import { commentControllers } from "./comments.controllers";
import { createCommentSchema, updateCommentSchema } from "./comments.schema";

const commentRouter = express.Router({ mergeParams: true });

commentRouter.use(requireAuth);

commentRouter.get("/", commentControllers.getCommentsByPostId);
commentRouter.post(
  "/",
  validateBody(createCommentSchema),
  commentControllers.createComment,
);
commentRouter.put(
  "/:id",
  validateBody(updateCommentSchema),
  commentControllers.updateComment,
);
commentRouter.delete("/:id", commentControllers.deleteComment);

export { commentRouter };
