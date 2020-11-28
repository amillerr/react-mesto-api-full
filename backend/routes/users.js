const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const {
  getUsers, getCurrentUser, getUser, updateInfo, updateAvatar,
} = require('../controllers/users');

router.get('/users', auth, getUsers);

router.get('/users/me', auth, getUser);

router.get('/users/:userId', celebrate({
  body: Joi.object().keys({
    _id: Joi.string().length(24),
  }),
}), auth, getCurrentUser);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateInfo);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/^(https?:\/\/)?([a-zA-z0-9%$&=?/.-]+)\.([a-zA-z0-9%$&=?/.-]+)([a-zA-z0-9%$&=?/.-]+)?(#)?$/),
  }),
}), updateAvatar);

module.exports = router;
