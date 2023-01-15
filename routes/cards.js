const express = require('express');
const {
  getCards,
  createCard,
  deleteCard,
  putLikeCard,
  removeLikeCard,
} = require('../controllers/card');

const {
  createCardValidation,
  deleteCardValidation,
  putLikeCardValidation,
  removeLikeCardValidation,
} = require('../middlewares/validation');

const cardRoutes = express.Router();

cardRoutes.get('/cards', getCards);

cardRoutes.post('/cards', createCardValidation, createCard);

cardRoutes.delete('/cards/:cardId', deleteCardValidation);

cardRoutes.put('/cards/:cardId/likes', putLikeCardValidation, putLikeCard);

cardRoutes.delete('/cards/:cardId/likes', removeLikeCardValidation, removeLikeCard);

module.exports = { cardRoutes };
