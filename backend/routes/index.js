const router = require('express').Router();
const usersRoutes = require('./users');
const cardsRoutes = require('./cards');

router.use('/', usersRoutes);
router.use('/', cardsRoutes);
router.use('/*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = router;
