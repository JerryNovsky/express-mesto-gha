class EmailError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

const emailMessage = 'this email is already registered';

module.exports = { EmailError, emailMessage };
