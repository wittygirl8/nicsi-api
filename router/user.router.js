const UserController = require('../controller/user.controller')
const express = require('express');
const adminLogin = require('../middleware/admin')
const coordinatorLogin = require('../middleware/coordinator')
const UserRouter = express.Router();

UserRouter.post('/create-user', adminLogin, UserController.createUser);
UserRouter.post('/get-all-user', adminLogin, UserController.getAllUser);
UserRouter.post('/get-user-by-id', adminLogin, UserController.getUserById);
UserRouter.post('/update-user', adminLogin, UserController.updateUser);
UserRouter.post('/delete-user', adminLogin, UserController.deleteUser);
UserRouter.post('/get-user-project-by-id',coordinatorLogin, UserController.getUserProjectById);


module.exports = UserRouter;

