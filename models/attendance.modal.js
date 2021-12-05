const mongoose = require('mongoose');
const attendanceSchema = new mongoose.Schema({
    id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'candidate'
    },
    month:{
        type: String,
        trim: true,
    },
    attendance:[{
        type: Date,
        trim:true
    }],
}, { timestamps: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);
module.exports = Attendance;