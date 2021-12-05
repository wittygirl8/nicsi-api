const mongoose = require('mongoose');
const workorderSchema = new mongoose.Schema({
    work_order_number: {
        type: String,
        trim: true,
        // default: 
    },
    issue_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    pi_number: {
        type: String,
        trim: true,
    }
}, { timestamps: true });

const WorkOrder = mongoose.model('WorkOrder', workorderSchema)

module.exports = WorkOrder;