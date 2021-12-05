const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
    project_number: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    work_order_number: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WorkOrder'
    },
    start_date: {
        type: String,
        trim: true
    },
    end_date: {
        type: String,
        trim: true
    },
    designation: {
        type: String,
        trim: true
    },
    absent: {
        type: Number,
        trim: true,
        default: 0
    }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema)

module.exports = Project;