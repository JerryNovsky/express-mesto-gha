const { celebrate, Joi } = require('celebrate');

const urlRegExp = /^https?:\/\/(www\.)?[a-zA-z\d-]+\.[a-z]{1,6}[\w\d\-._~:/?#[\]@!$&'()*+,;=]{2,}#?$/;

module.exports.createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(urlRegExp),
  }),
});

module.exports.idCardValidation = celebrate({
  params: Joi.object({
    cardId: Joi.string().hex().length(24).required(),
  }).required(),
});
