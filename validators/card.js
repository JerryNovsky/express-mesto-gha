const { celebrate, Joi } = require('celebrate');
const { urlRegExp } = require('../utils/regExp');

module.exports.createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().regex(urlRegExp).required(),
  }),
});

module.exports.idCardValidation = celebrate({
  params: Joi.object({
    cardId: Joi.string().hex().length(24).required(),
  }).required(),
});
