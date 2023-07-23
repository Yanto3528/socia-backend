import express from "express";

import { requireAuth, validateBody } from "@/middlewares";

import { profileControllers } from "./profiles.controllers";
import { updateProfileSchema } from "./profiles.schema";

const profileRouter = express.Router();

profileRouter.use(requireAuth);

profileRouter.get("/me", profileControllers.getCurrentUserProfile);
profileRouter.put(
  "/me",
  validateBody(updateProfileSchema),
  profileControllers.updateProfile,
);
profileRouter.get("/:userId", profileControllers.getProfileByUserId);

export { profileRouter };
