const usersRouter = require('express').Router();
const usersControllers = require('../controllers/users');

usersRouter.get('/', usersControllers.getUsers);
usersRouter.get('/:userId', usersControllers.getUserById);
usersRouter.post('/', usersControllers.createUser);
usersRouter.patch('/me', usersControllers.updateUser);
usersRouter.patch('/me/avatar', usersControllers.updateAvatar);

module.exports = usersRouter;
