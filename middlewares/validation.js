const mongoose = require('mongoose');
const { celebrate, Joi } = require('celebrate');

const idValidate = (value, helper) => (mongoose.isValidObjectId(value) ? value : helper.message('Not id'));
const urlRegExp = /^https?:\/\/(www\.)?[a-zA-z\d-]+\.[a-z]{1,6}[\w\d\-._~:/?#[\]@!$&'()*+,;=]{2,}#?$/;

module.exports.signInValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.signUpValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urlRegExp),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports.updateUserInfoValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

module.exports.updateAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(urlRegExp),
  }),
});

module.exports.getUserByIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().custom(idValidate),
  }),
});

module.exports.createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(urlRegExp),
  }),
});

module.exports.deleteCardValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().custom(idValidate),
  }),
});

module.exports.putLikeCardValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().custom(idValidate),
  }),
});

module.exports.removeLikeCardValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().custom(idValidate),
  }),
});
