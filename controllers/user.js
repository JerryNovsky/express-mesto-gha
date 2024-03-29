const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { BadRequestError, badRequestMessage } = require('../utils/BadRequestError');
const { EmailError, emailMessage } = require('../utils/EmailError');
const { NotFoundError, notFoundMessage } = require('../utils/NotFoundError');
const { InternalServerError, serverMessage } = require('../utils/InternalServerError');
const { UnauthorizedError, authorizationErrorMessage } = require('../utils/UnauthorizedError');
const { JWT_SECRET } = require('../utils/token');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => next(new InternalServerError(serverMessage)));
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        next(new NotFoundError(notFoundMessage));
      }
    })
    .catch(() => {
      next(new InternalServerError(serverMessage));
    });
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        next(new NotFoundError(notFoundMessage));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(badRequestMessage));
      } else {
        next(new InternalServerError(serverMessage));
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((document) => {
      const user = document.toObject();
      delete user.password;
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(badRequestMessage));
      } else if (err.code === 11000) {
        next(new EmailError(emailMessage));
      } else {
        next(new InternalServerError(serverMessage));
      }
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        next(new NotFoundError(notFoundMessage));
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(badRequestMessage));
      } else {
        next(new InternalServerError(serverMessage));
      }
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(notFoundMessage);
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(badRequestMessage));
      } else {
        next(new InternalServerError(serverMessage));
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => {
      if (err.name !== 'UnauthorizedError') {
        next(new UnauthorizedError(authorizationErrorMessage));
      } else {
        next(err);
      }
    });
};
