import express from "express";

import { requireAuth } from "@/middlewares";

import { userControllers } from "./users.controllers";

const userRouter = express.Router();

userRouter.use(requireAuth);

userRouter.get("/", userControllers.getUsers);
userRouter.get("/:id", userControllers.getUserById);

export { userRouter };
