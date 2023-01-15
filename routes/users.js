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
  getUserByIdValidation,
} = require('../middlewares/validation');

const userRoutes = express.Router();

userRoutes.get('/users', getUsers);

userRoutes.get('/users/:userId', getUserByIdValidation, getUserById);

userRoutes.patch('/users/me', updateUserInfoValidation, updateUserInfo);

userRoutes.patch('/users/me/avatar', updateAvatarValidation, updateUserAvatar);

userRoutes.get('/users/me', getCurrentUser);

module.exports = { userRoutes };
