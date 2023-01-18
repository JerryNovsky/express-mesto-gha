/* eslint-disable consistent-return */
/* eslint-disable no-empty */
/* eslint-disable no-lone-blocks */
const Card = require('../models/card');
const { ForbiddenError, forbiddenMessage } = require('../utils/ForbiddenError');
const { NotFoundError, notFoundMessage } = require('../utils/NotFoundError');
const { BadRequestError, badRequestMessage } = require('../utils/BadRequestError');
const { InternalServerError, serverMessage } = require('../utils/InternalServerError');
const { HttpError } = require('../utils/HttpError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => next(new InternalServerError(serverMessage)));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(badRequestMessage));
      } else {
        next(new InternalServerError(serverMessage));
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(notFoundMessage);
      } else if (req.user._id !== card.owner.toString()) {
        throw new ForbiddenError(forbiddenMessage);
      } else {
        return card.remove()
          .then(() => card);
      }
    })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(badRequestMessage));
      } else if (err instanceof HttpError) {
        next(err);
      } else {
        next(new InternalServerError(serverMessage));
      }
    });
};

module.exports.putLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        next(new NotFoundError(notFoundMessage));
      } else {
        res.send({ data: card });
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

module.exports.removeLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        next(new NotFoundError(notFoundMessage));
      } else {
        res.send({ data: card });
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
