const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/cards', auth, getCards);

router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().max(30).min(2).required(),
    link: Joi.string().required(),
  }),
}), auth, createCard);

router.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
}), auth, deleteCard);

router.put('/cards/likes/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex(),
    }),
  }), auth, likeCard);

router.delete('/cards/likes/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex(),
    }),
  }), auth, dislikeCard);

module.exports = router;
