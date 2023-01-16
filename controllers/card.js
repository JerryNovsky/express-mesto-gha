/* eslint-disable consistent-return */
/* eslint-disable no-empty */
/* eslint-disable no-lone-blocks */
const Card = require('../models/card');
const { ForbiddenError, forbiddenMessage } = require('../utils/ForbiddenError');
const { NotFoundError, notFoundMessage } = require('../utils/NotFoundError');
const { BadRequestError, badRequestMessage } = require('../utils/BadRequestError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(badRequestMessage));
      }
      return next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(notFoundMessage);
      } if (card.owner._id.toString() !== req.user._id) {
        throw new ForbiddenError(forbiddenMessage);
      }
      Card.findByIdAndDelete(req.params.cardId)
        .then((myCard) => res.send({ data: myCard }))
        .catch((err) => {
          if (err.name === 'CastError') {
            return next(new BadRequestError(badRequestMessage));
          }
          return next(err);
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(badRequestMessage));
      }
      return next(err);
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
        throw new NotFoundError(notFoundMessage);
      }
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return next(new BadRequestError(badRequestMessage));
      }
      return next(err);
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
        throw new NotFoundError(notFoundMessage);
      }
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return next(new BadRequestError(badRequestMessage));
      }
      return next(err);
    });
};
