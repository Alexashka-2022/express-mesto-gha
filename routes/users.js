const usersRouter = require('express').Router();
const usersControllers = require('../controllers/users');

usersRouter.get('/users', usersControllers.getUsers);
usersRouter.get('/users/:userId', usersControllers.getUserById);
usersRouter.post('/users', usersControllers.createUser);
usersRouter.patch('/users/me', usersControllers.updateUser);
usersRouter.patch('/users/me/avatar', usersControllers.updateAvatar);

module.exports = usersRouter;
