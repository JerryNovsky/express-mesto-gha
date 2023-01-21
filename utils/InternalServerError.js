class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }
}

const serverMessage = 'Ошибка сервера';

module.exports = { InternalServerError, serverMessage };
