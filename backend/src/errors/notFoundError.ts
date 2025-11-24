import ApiError from './apiError';

class NotFoundError extends ApiError {
  constructor(message: string = 'Маршрут не найден') {
    super(message, 404);
  }
}

export default NotFoundError;
