const cardsRouter = require('express').Router();
const cardsControllers = require('../controllers/cards');

cardsRouter.get('/', cardsControllers.getCards);
cardsRouter.post('/', cardsControllers.createCard);
cardsRouter.delete('/:cardId', cardsControllers.deleteCard);
cardsRouter.put('/:cardId/likes', cardsControllers.likeCard);
cardsRouter.delete('/:cardId/likes', cardsControllers.dislikeCard);

module.exports = cardsRouter;
