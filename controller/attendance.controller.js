const Attendance = require('../models/attendance.modal')
class AttendanceController{
    static createAttendance = async (req, res) => {
        try {
            const request_data = {...req.body}
            const data = await Attendance(request_data);
            await data.save();
            if(data.length !== 0) {
                res.status(200).send({
                    status: 200,
                    data
                });
            };
        }catch(error) {
            res.status(404).send({
                status: 404,
                message: error.message
            });
        }
    }
}

module.exports = AttendanceController;