// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import { errorHandler } from "./middlewares";
import { authRouter } from "./features/auth/auth.routes";
import { userRouter } from "./features/users/users.routes";
import { profileRouter } from "./features/profiles/profiles.routes";
import { postRouter } from "./features/posts/posts.routes";
import { commentRouter } from "./features/comments/comments.routes";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/profiles", profileRouter);
app.use("/api/posts", postRouter);
app.use("/api/posts/:postId/comments", commentRouter);

app.use(errorHandler);

export { app };
