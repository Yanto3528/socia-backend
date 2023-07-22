import express from "express";

import { validateBody } from "@/middlewares";

import { signupBodySchema, loginBodySchema } from "./auth.schema";
import { authController } from "./auth.controllers";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  validateBody(signupBodySchema),
  authController.signUp
);
authRouter.post("/login", validateBody(loginBodySchema), authController.login);
authRouter.delete("/logout", authController.logout);

export { authRouter };
