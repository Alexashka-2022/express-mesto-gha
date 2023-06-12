const { default: mongoose } = require('mongoose');
const http2 = require('node:http2');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');

const JWT_SECRET = 'secret-key';

const {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_NOT_FOUND,
} = http2.constants;

const handleError = (err, next) => {
  if (err instanceof mongoose.Error.CastError || err instanceof mongoose.Error.ValidationError) {
    return next(new BadRequestError('Переданы некорректные данные'));
  }
  if (err instanceof mongoose.Error.DocumentNotFoundError) {
    return next(new NotFoundError('Элемент с таким _id не был найден'));
  }

  return next(err);
};

module.exports = {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_NOT_FOUND,
  handleError,
  JWT_SECRET,
};
