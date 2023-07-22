import express from "express";

import { validateBody } from "@/middlewares";

import { signupBodySchema, loginBodySchema } from "./auth.schema";
import { authControllers } from "./auth.controllers";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  validateBody(signupBodySchema),
  authControllers.signUp,
);
authRouter.post("/login", validateBody(loginBodySchema), authControllers.login);
authRouter.delete("/logout", authControllers.logout);

export { authRouter };
