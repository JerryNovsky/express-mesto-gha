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
  idCardValidation,
} = require('../validators/card');

const cardRoutes = express.Router();

cardRoutes.get('/cards', getCards);

cardRoutes.post('/cards', createCardValidation, createCard);

cardRoutes.delete('/cards/:cardId', idCardValidation, deleteCard);

cardRoutes.put('/cards/:cardId/likes', idCardValidation, putLikeCard);

cardRoutes.delete('/cards/:cardId/likes', idCardValidation, removeLikeCard);

module.exports = { cardRoutes };
