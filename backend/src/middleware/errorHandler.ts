import { NextFunction, Request, Response } from 'express';
import ApiError from '../errors/apiError';

function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ApiError) {
    res.status(err.statusCode).send({ message: err.message });
  }
}

export default errorHandler;
