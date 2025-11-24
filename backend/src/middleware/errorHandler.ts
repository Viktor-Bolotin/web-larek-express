import { NextFunction, Request, Response } from 'express';
import ApiError from '../errors/apiError';

// Не получилось сделать установку значения statusCode через ИЛИ,
// так как возникает ошибка от TS о том, что statusCode отсутствует в Error,
// не уверен, что интерфейс Error можно изменять, поэтому сделал через if, по аналалогии с message

function errorHandler(err: Error, _req: Request, res: Response, next: NextFunction) {
  const statusCode = err instanceof ApiError ? err.statusCode : 500;
  const errorMessage: string = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message: errorMessage });
  next();
}

export default errorHandler;
