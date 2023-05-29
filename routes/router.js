const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { HTTP_STATUS_NOT_FOUND } = require('../constants/constants');

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('/*', (req, res) => {
  res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'Такой страницы не существует' });
});

module.exports = router;
