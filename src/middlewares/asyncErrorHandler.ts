import { Request, Response, NextFunction } from "express";

type AsyncHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

export const asyncErrorHandler =
  (myFunc: AsyncHandler) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(myFunc(req, res, next)).catch(next);
  };
