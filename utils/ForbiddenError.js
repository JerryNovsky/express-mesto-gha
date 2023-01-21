class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

const forbiddenMessage = 'Вы не можете удалять чужие карточки';

module.exports = { ForbiddenError, forbiddenMessage };
