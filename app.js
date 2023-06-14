const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const router = require('./routes/router');

const auth = require('./middlewares/auth');
const { registerValidation, loginValidation } = require('./middlewares/validation');

const { serverError } = require('./middlewares/serverError');

const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://0.0.0.0:27017/mestodb')
  .then(() => {
    console.log('Соединение с MongoDB установлено успешно');
  }).catch((err) => {
    console.log(err);
  });

const {
  login,
  createUser,
} = require('./controllers/users');

const app = express();

app.use(express.json());
app.post('/signin', loginValidation, login);
app.post('/signup', registerValidation, createUser);
app.use(auth);
app.use(router);
app.use(errors());
app.use(serverError);

app.listen(PORT, () => {
  console.log(`Приложение слушает порт ${PORT}`);
});
