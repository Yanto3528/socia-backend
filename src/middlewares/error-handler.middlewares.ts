import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  const status = err.status || "error";
  let { message } = err;

  if (err.name === "ZodError") {
    message = err.issues[0].message;
    statusCode = 400;
  }

  res.status(statusCode).json({
    status,
    message,
  });
};
