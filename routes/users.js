const express = require("express");
const {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
} = require("../controllers/user.js");
const userRoutes = express.Router();

userRoutes.get("/users", getUsers);

userRoutes.get("/users/:userId", getUserById);

userRoutes.post("/users", express.json(), createUser);

userRoutes.patch("/users/me", express.json(), updateUserInfo);

userRoutes.patch("/users/me/avatar", express.json(), updateUserAvatar);

module.exports = { userRoutes };
