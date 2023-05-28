const http2 = require('node:http2');

const {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
} = http2.constants;

const handleError = (err, res) => {
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    return res.status(HTTP_STATUS_BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
  }
  if (err.name === 'DocumentNotFoundError') {
    return res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'Элемент с таким _id не был найден' });
  }

  return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Сервер передал ошибку' });
};

module.exports = {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_NOT_FOUND,
  handleError,
};
