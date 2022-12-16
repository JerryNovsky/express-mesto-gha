const express = require("express");
const {
  getCards,
  createCard,
  deleteCard,
  putLikeCard,
  removeLikeCard,
} = require("../controllers/card.js");
const cardRoutes = express.Router();

cardRoutes.get("/cards", getCards);

cardRoutes.post("/cards", express.json(), createCard);

cardRoutes.delete("/cards/:cardId", deleteCard);

cardRoutes.put("/cards/:cardId/likes", putLikeCard);

cardRoutes.delete("/cards/:cardId/likes", removeLikeCard);

module.exports = { cardRoutes };
