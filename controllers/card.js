/* eslint-disable consistent-return */
/* eslint-disable no-empty */
/* eslint-disable no-lone-blocks */
const Card = require('../models/card');
const {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
} = require('../utils/errors');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(() => {
      res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: `ERROR ${INTERNAL_SERVER_ERROR}: Server error` });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
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

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new Error('NotValidId'))
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(NOT_FOUND).send({ message: `ERROR ${NOT_FOUND}: Card not found` });
      } else {
        res.status(INTERNAL_SERVER_ERROR)
          .send({ message: `ERROR ${INTERNAL_SERVER_ERROR}: Server error` });
      }
    });
};

module.exports.putLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('NotValidId'))
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(NOT_FOUND).send({ message: `ERROR ${NOT_FOUND}: Card not found` });
      } else {
        res.status(INTERNAL_SERVER_ERROR)
          .send({ message: `ERROR ${INTERNAL_SERVER_ERROR}: Server error` });
      }
    });
};

module.exports.removeLikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('NotValidId'))
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        res.status(NOT_FOUND).send({ message: `ERROR ${NOT_FOUND}: Card not found` });
      } else {
        res.status(INTERNAL_SERVER_ERROR)
          .send({ message: `ERROR ${INTERNAL_SERVER_ERROR}: Server error` });
      }
    });
};
