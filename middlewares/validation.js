const { celebrate, Joi } = require('celebrate');
const isEmail = require('validator/lib/isEmail');
const BadRequestError = require('../errors/BadRequestError');

const regex = /^(http|https):\/\/[^"]+$/;

/* валидация электронной почты с помощью validator */
const validateEmail = (email) => {
  const isValid = isEmail(email);
  if (isValid) {
    return email;
  }
  throw new BadRequestError('Введен некорректный email');
};

/* валидация информациии при регистрации */
const registerValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail),
    password: Joi.string().required().min(4),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regex),
  }),
});

/* валидация информации при авторизации */
const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail),
    password: Joi.string().required().min(4),
  }),
});

const getUserByIdValidation = celebrate({
  body: Joi.object().keys({
    userId: Joi.string().length(24),
  }),
});

/* валидация информации при изменении пользователя */
const updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

/* валидация при изменении аватара */
const updateAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(regex),
  }),
});

/* валидация создания карточки */
const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().required().pattern(regex),
  }),
});

/* валидация id при удалении карточки */
const deleteCardValidation = celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().length(24),
  }),
});

/* валидация id при лайке карточки */
const likeCardValidation = celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().length(24),
  }),
});

module.exports = {
  registerValidation,
  loginValidation,
  getUserByIdValidation,
  updateUserValidation,
  updateAvatarValidation,
  createCardValidation,
  deleteCardValidation,
  likeCardValidation,
};
