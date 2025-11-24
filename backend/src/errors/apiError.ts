abstract class ApiError extends Error {
  statusCode: number;

  constructor(message: string = 'Произошла ошибка сервера', statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default ApiError;
