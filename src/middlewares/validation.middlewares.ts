import { AnyZodObject } from "zod";

import { catchAsync } from "@/utils/helper.utils";

export const validateRequest = (schema: AnyZodObject) =>
  catchAsync(async (req, res, next) => {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    return next();
  });

export const validateBody = (schema: AnyZodObject) =>
  catchAsync(async (req, res, next) => {
    await schema.parseAsync(req.body);

    return next();
  });

export const validateQuery = (schema: AnyZodObject) =>
  catchAsync(async (req, res, next) => {
    await schema.parseAsync(req.query);

    return next();
  });
