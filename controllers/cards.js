const Card = require('../models/card');
const NotFoundError = require('../errors/notfound-error');
const RequestError = require('../errors/auth-error');

const getCards = (req, res, next) => {
  Card.find({})
    .then((data) => res.send(data))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(200).send(card))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new RequestError('Ошибка. Повторите запрос'));
        return;
      }
      next(error);
    });
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(new NotFoundError('Не найдена карточка с данным id'))
    .then((card) => res.status(200).send(card))
    .catch(next);
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate({ _id: req.params._id },
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Не найдена карточка с данным id');
      }
      res.send({ data: card });
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate({ _id: req.params._id },
    { $pull: { likes: req.user._id } },
    { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Не найдена карточка с данным id');
      }
      res.send({ data: card });
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
