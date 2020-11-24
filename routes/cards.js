const router = require('express').Router();
const {
  createCardValidate,
  deleteCardValidate,
  likeCardValidate,
  dislikeCardValidate,
} = require('../middlewares/validRequest');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', createCardValidate, createCard);
router.delete('/cards/:cardId', deleteCardValidate, deleteCard);
router.put('/cards/:cardId/likes', likeCardValidate, likeCard);
router.delete('/cards/:cardId/likes', dislikeCardValidate, dislikeCard);

module.exports = router;
