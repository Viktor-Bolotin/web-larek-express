import ApiError from './apiError';

class BadRequestError extends ApiError {
  constructor(message: string = 'Отправлены некорректные данные') {
    super(message, 400);
  }
}

export default BadRequestError;
