import express from "express";

import { validateBody, requireAuth } from "@/middlewares";

import { postControllers } from "./posts.controllers";
import { createPostSchema, updatePostSchema } from "./posts.schema";

const postRouter = express.Router();

postRouter.use(requireAuth);

postRouter.get("/", postControllers.getPosts);
postRouter.get("/:id", postControllers.getPostById);
postRouter.post(
  "/",
  validateBody(createPostSchema),
  postControllers.createPost,
);
postRouter.put(
  "/:id",
  validateBody(updatePostSchema),
  postControllers.updatePost,
);
postRouter.delete("/:id", postControllers.deletePost);

export { postRouter };
