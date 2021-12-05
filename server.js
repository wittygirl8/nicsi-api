const express = require('express');
const bodyParser = require('body-parser')
const AuthRouter= require('./router/auth.router');
const AdminRouter= require('./router/admin.router');
const WorkOrderRouter= require('./router/work-order.router');
const UserRouter= require('./router/user.router');
const CandidateRouter= require('./router/candidate.router');
const AttendanceRouter = require('./router/attendance.router');
var cors = require('cors');
require('dotenv').config()
require('./db/mongoose')
const app = express();

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.options('*', cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/test-api', (req, res) => {
    res.send({
        message: "Test API"
    })
})

app.use(AuthRouter);
app.use(AdminRouter);
app.use(WorkOrderRouter);
app.use(UserRouter);
app.use(CandidateRouter);
app.use(AttendanceRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is up to ${PORT}`);
})