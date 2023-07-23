import { z } from "zod";
import { Prisma } from "@prisma/client";

import { updateProfileSchema } from "./profiles.schema";

export type CreateProfileDto = Prisma.ProfileCreateArgs["data"];
export type UpdateProfileDto = Prisma.ProfileUpdateArgs["data"];

export type UpdateProfilePayload = z.infer<typeof updateProfileSchema>;
