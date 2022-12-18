const User = require('../models/user');

const {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} = require('../utils/errors');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => {
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: `ERROR ${INTERNAL_SERVER_ERROR}: Server error` });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error('NotValidId'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(NOT_FOUND).send({ message: `ERROR ${NOT_FOUND}: User not found` });
      } else {
        res.status(INTERNAL_SERVER_ERROR)
          .send({ message: `ERROR ${INTERNAL_SERVER_ERROR}: Server error` });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(BAD_REQUEST)
          .send({ message: `ERROR ${BAD_REQUEST}: Validation error` });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: `ERROR ${INTERNAL_SERVER_ERROR}: Server error` });
    });
};

module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(new Error('NotValidId'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(NOT_FOUND).send({ message: `ERROR ${NOT_FOUND}: User not found` });
      } else {
        res.status(BAD_REQUEST)
          .send({ message: `ERROR ${BAD_REQUEST}: Server error` });
      }
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .orFail(new Error('NotValidId'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(NOT_FOUND).send({ message: `ERROR ${NOT_FOUND}: User not found` });
      } else {
        res.status(BAD_REQUEST)
          .send({ message: `ERROR ${BAD_REQUEST}: Server error` });
      }
    });
};
