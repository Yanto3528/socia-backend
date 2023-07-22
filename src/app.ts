// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import { errorHandler } from "./middlewares";
// import { userRouter } from "./features/users/users.routes";
import { authRouter } from "./features/auth/auth.routes";
// import { categoryRouter } from "./features/categories/categories.route";
// import { productRouter } from "./features/products/products.route";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// app.use("/api/v1/users/", userRouter);
app.use("/api/auth", authRouter);
// app.use("/api/v1/categories/", categoryRouter);
// app.use("/api/v1/products/", productRouter);

app.use(errorHandler);

export { app };
