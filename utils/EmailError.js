class EmailError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

const emailMessage = 'Пользователь с такой почтой уже зарегистрирован';

module.exports = { EmailError, emailMessage };
