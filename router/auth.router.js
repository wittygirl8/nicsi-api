const AuthController = require("../controller/auth.controller");
const express = require('express');
const adminLogin = require('../middleware/admin')
const userLogin = require('../middleware/user')
const AuthRouter = express.Router();

AuthRouter.post('/register', AuthController.register);
AuthRouter.post('/sign-in', AuthController.UserLogin);
AuthRouter.post('/candidate-sign-in', AuthController.CandidateLogin);
AuthRouter.post('/admin-sign-in', AuthController.AdminLogin);
AuthRouter.post('/get-login-user',  AuthController.getLoginUser);
AuthRouter.post('/get-login-admin',  AuthController.getLoginAdmin);
AuthRouter.post('/get-login-candidate',  AuthController.getLoginCandidate);
AuthRouter.post('/logout-admin', adminLogin, AuthController.logoutAdmin);
// AuthRouter.post('/logout-candidate', userLogin, AuthController.logoutUser);

module.exports = AuthRouter;