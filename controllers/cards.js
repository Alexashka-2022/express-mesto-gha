const cardModel = require('../models/card');
const {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_NOT_FOUND,
  handleError,
} = require('../constants/constants');

const getCards = (req, res) => {
  cardModel.find({})
    .then((cards) => {
      res.status(HTTP_STATUS_OK).send(cards);
    }).catch((err) => {
      handleError(err, res);
    });
};

const createCard = (req, res) => {
  cardModel.create({
    owner: req.user._id,
    ...req.body,
  }).then((card) => {
    res.status(HTTP_STATUS_CREATED).send(card);
  }).catch((err) => {
    handleError(err, res);
  });
};

const deleteCard = (req, res) => {
  cardModel.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'Передан несуществующий _id карточки' });
      }
      return res.status(HTTP_STATUS_OK).send(card);
    }).catch((err) => {
      handleError(err, res);
    });
};

const likeCard = (req, res) => {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    /* $addToSet - добавляет элемент в массив, если его там ещё нет */
    { $addToSet: { likes: req.user._id } },
    /* new: true - возвращает измененный документ, а не оригинал. По умолчанию - false */
    { new: true },
  ).then((card) => {
    if (!card) {
      return res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'Передан несуществующий _id карточки' });
    }
    return res.status(HTTP_STATUS_CREATED).send(card);
  }).catch((err) => {
    handleError(err, res);
  });
};

const dislikeCard = (req, res) => {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    /* $pull - убирает элемент из массива */
    { $pull: { likes: req.user._id } },
    /* new: true - возвращает измененный документ, а не оригинал. По умолчанию - false */
    { new: true },
  ).then((card) => {
    if (!card) {
      return res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'Передан несуществующий _id карточки' });
    }
    return res.status(HTTP_STATUS_OK).send(card);
  }).catch((err) => {
    handleError(err, res);
  });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
