const WorkOrderController = require('../controller/work-order.controller')
const express = require('express');
const adminLogin = require('../middleware/admin')
const WorkOrderRouter = express.Router();


WorkOrderRouter.post('/create-work-order', adminLogin, WorkOrderController.createWorkOrder);
WorkOrderRouter.post('/get-all-work-order', adminLogin, WorkOrderController.getAllWorkOrder);
WorkOrderRouter.post('/delete-work-order', adminLogin, WorkOrderController.deleteWorkOrder);
WorkOrderRouter.post('/get-work-order-by-id', adminLogin, WorkOrderController.getWorkOrderById);
WorkOrderRouter.post('/update-work-order', adminLogin, WorkOrderController.updateWorkOrder);

module.exports = WorkOrderRouter;
