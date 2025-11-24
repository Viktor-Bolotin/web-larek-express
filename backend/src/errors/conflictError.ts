import ApiError from './apiError';

class ConflictError extends ApiError {
  constructor(message: string = 'Отправлено неуникальное значение') {
    super(message, 409);
  }
}

export default ConflictError;
