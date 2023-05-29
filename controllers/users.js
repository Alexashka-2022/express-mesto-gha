const userModel = require('../models/user');
const {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_NOT_FOUND,
  handleError,
} = require('../constants/constants');

const getUsers = (req, res) => {
  userModel.find({})
    .then((users) => {
      res.status(HTTP_STATUS_OK).send(users);
    }).catch((err) => {
      handleError(err, res);
    });
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  userModel.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(HTTP_STATUS_NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден' });
      }
      return res.status(HTTP_STATUS_OK).send(user);
    }).catch((err) => {
      handleError(err, res);
    });
};

const createUser = (req, res) => {
  userModel.create(req.body)
    .then((user) => {
      res.status(HTTP_STATUS_CREATED).send(user);
    }).catch((err) => {
      handleError(err, res);
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  userModel.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  ).then((user) => {
    res.status(HTTP_STATUS_OK).send(user);
  }).catch((err) => {
    handleError(err, res);
  });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  userModel.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true },
  ).then(() => {
    res.status(HTTP_STATUS_OK).send({ avatar });
  }).catch((err) => {
    handleError(err, res);
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};
