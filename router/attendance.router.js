const AttendanceController = require("../controller/attendance.controller");
const express = require('express');
const coordinatorLogin = require('../middleware/coordinator')
const AttendanceRouter = express.Router();

AttendanceRouter.post('/create-attendance', coordinatorLogin, AttendanceController.createAttendance);

module.exports = AttendanceRouter;