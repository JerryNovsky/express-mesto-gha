class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

const badRequestMessage = 'Проверьте введенные данные';

module.exports = { BadRequestError, badRequestMessage };
