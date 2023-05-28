const cardsRouter = require('express').Router();
const cardsControllers = require('../controllers/cards');

cardsRouter.get('/cards', cardsControllers.getCards);
cardsRouter.post('/cards', cardsControllers.createCard);
cardsRouter.delete('/cards/:cardId', cardsControllers.deleteCard);
cardsRouter.put('/cards/:cardId/likes', cardsControllers.likeCard);
cardsRouter.delete('/cards/:cardId/likes', cardsControllers.dislikeCard);

module.exports = cardsRouter;
