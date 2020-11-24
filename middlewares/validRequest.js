const { celebrate, Joi } = require('celebrate');

const loginValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

const registerValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
});

// User Validation
const byIdValidate = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }),
});

const userUpdateValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(8).max(30),
  }),
});

const userAvatarValidate = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/),
  }),
});

// Card Validation

const createCardValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/),
  }),
});

const deleteCardValidate = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }),
});

const likeCardValidate = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }),
});

const dislikeCardValidate = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }),
});

module.exports = {
  loginValidate,
  registerValidate,
  byIdValidate,
  userUpdateValidate,
  userAvatarValidate,
  createCardValidate,
  deleteCardValidate,
  likeCardValidate,
  dislikeCardValidate,
};
