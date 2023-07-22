/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";

export const catchAsync =
  <ReqBody = any, ReqQuery = any>(
    fn: (
      req: Request<any, any, ReqBody, ReqQuery>,
      res: Response,
      next: NextFunction
    ) => Promise<any>
  ) =>
  (
    req: Request<any, any, ReqBody, ReqQuery>,
    res: Response,
    next: NextFunction
  ) =>
    fn(req, res, next).catch(next);
