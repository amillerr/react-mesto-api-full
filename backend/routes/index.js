const router = require('express').Router();
const usersRoutes = require('./users');
const cardsRoutes = require('./cards');
const NotFoundError = require('../errors/notfound-error');

router.use('/', usersRoutes);
router.use('/', cardsRoutes);
router.all('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = router;
