const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const router = require('./routes/router');

const auth = require('./middlewares/auth');
const { registerValidation, loginValidation } = require('./middlewares/validation');

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

app.use((err, req, res, next) => {
  const { status = 500, message } = err;
  res.status(status).send({ message: status === 500 ? 'Сервер передал ошибку' : message });
  next();
});

app.listen(PORT, () => {
  console.log(`Приложение слушает порт ${PORT}`);
});
