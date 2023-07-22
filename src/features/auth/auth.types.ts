import { z } from "zod";

import { signupBodySchema, loginBodySchema } from "./auth.schema";

export type SignUpBodyPayload = z.infer<typeof signupBodySchema>;
export type LoginBodyPayload = z.infer<typeof loginBodySchema>;
