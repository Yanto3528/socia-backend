import express from "express";

import { validateBody } from "@/middlewares";
import { requireAuth } from "@/middlewares";

import { postControllers } from "./posts.controllers";
import { createPostSchema } from "./posts.schema";

const postRouter = express.Router();

postRouter.get("/", postControllers.getPosts);
postRouter.get("/:id", postControllers.getPostById);
postRouter.post(
  "/",
  validateBody(createPostSchema),
  requireAuth,
  postControllers.createPost,
);
postRouter.put("/:id", requireAuth, postControllers.updatePost);
postRouter.delete("/:id", requireAuth, postControllers.deletePost);

export { postRouter };
