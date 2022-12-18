const express = require('express');
const {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/user');

const userRoutes = express.Router();

userRoutes.get('/users', getUsers);

userRoutes.get('/users/:userId', getUserById);

userRoutes.post('/users', createUser);

userRoutes.patch('/users/me', updateUserInfo);

userRoutes.patch('/users/me/avatar', updateUserAvatar);

module.exports = { userRoutes };
