const express = require('express');
const {
  getUsers,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/user');

const {
  updateUserInfoValidation,
  updateAvatarValidation,
  idUserValidation,
} = require('../validators/user');

const userRoutes = express.Router();

userRoutes.get('/users', getUsers);

userRoutes.get('/users/:userId', idUserValidation, getUserById);

userRoutes.patch('/users/me', updateUserInfoValidation, updateUserInfo);

userRoutes.patch('/users/me/avatar', updateAvatarValidation, updateUserAvatar);

userRoutes.get('/users/me', getCurrentUser);

module.exports = { userRoutes };
