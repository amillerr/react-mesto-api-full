const router = require('express').Router();

const NotFoundError = require('../errors/notfound-error');

router.all('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

module.exports = router;
