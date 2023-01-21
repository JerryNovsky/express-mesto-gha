class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

const notFoundMessage = 'Информация не найдена';

module.exports = { NotFoundError, notFoundMessage };
