const AdminController = require("../controller/admin.controller");
const express = require('express');
const adminLogin = require('../middleware/admin')
const AdminRouter = express.Router();

AdminRouter.post('/create-project', adminLogin, AdminController.createProject);
AdminRouter.post('/get-all-projects', adminLogin, AdminController.getAllProject);
AdminRouter.post('/delete-project', adminLogin, AdminController.deleteProject);
// AdminRouter.post('/get-user-by-id', adminLogin, AdminController.getUserId);

AdminRouter.post('/get-project-by-id', adminLogin, AdminController.getProjectById);
AdminRouter.post('/update-project', adminLogin, AdminController.updateProject);

module.exports = AdminRouter;