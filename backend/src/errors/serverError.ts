import ApiError from './apiError';

class ServerError extends ApiError {
  constructor(message: string = 'Ошибка сервера') {
    super(message, 500);
  }
}

export default ServerError;
