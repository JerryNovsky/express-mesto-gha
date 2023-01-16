const { celebrate, Joi } = require('celebrate');

const urlRegExp = /^https?:\/\/(www\.)?[a-zA-z\d-]+\.[a-z]{1,6}[\w\d\-._~:/?#[\]@!$&'()*+,;=]{2,}#?$/;

module.exports.createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(urlRegExp),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.signInValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

module.exports.updateAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(urlRegExp).required(),
  }),
});

module.exports.updateUserInfoValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

module.exports.idUserValidation = celebrate({
  params: Joi.object({
    userId: Joi.alternatives().try(
      Joi.string().hex().length(24).required(),
    ).required(),
  }).required(),
});
