const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');

const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

mongoose.connect('mongodb://0.0.0.0:27017/mestodb')
  .then(() => {
    console.log('Соединение с MongoDB установлено успешно');
  }).catch((err) => {
    console.log(err);
  });

app.use((req, res, next) => {
  req.user = {
    _id: '6471ef66a5854a2ff70b98ff',
  };

  next();
});

app.use(usersRouter);
app.use(cardsRouter);

app.listen(PORT, () => {
  console.log(`Приложение слушает порт ${PORT}`);
});
