class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

const notFoundMessage = 'Карточка не найдена';

module.exports = { NotFoundError, notFoundMessage };
