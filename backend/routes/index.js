const router = require('express').Router();
const usersRoutes = require('./users');
const cardsRoutes = require('./cards');
const NotFoundError = require('../errors/notfound-error');

router.use('/', usersRoutes);
router.use('/', cardsRoutes);
router.use('/*', (req, res, next) => {
  const error = new NotFoundError('Запрашиваемый ресурс не найден');
  next(error);
});

module.exports = router;
