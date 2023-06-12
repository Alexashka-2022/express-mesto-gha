const cardsRouter = require('express').Router();
const cardsControllers = require('../controllers/cards');
const cardValidation = require('../middlewares/validation');

cardsRouter.get('/', cardsControllers.getCards);
cardsRouter.post('/', cardValidation.createCardValidation, cardsControllers.createCard);
cardsRouter.delete('/:cardId', cardValidation.deleteCardValidation, cardsControllers.deleteCard);
cardsRouter.put('/:cardId/likes', cardValidation.likeCardValidation, cardsControllers.likeCard);
cardsRouter.delete('/:cardId/likes', cardValidation.likeCardValidation, cardsControllers.dislikeCard);

module.exports = cardsRouter;
