const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
    hsn:{
        type: String,
        trim: true,
    },
    project_number: {
        type: String,
        trim: true,
        // default: uuidv4()
    },
    name: {
        type: String,
        trim: true
    },
    start_date: {
        type: String,
        trim: true
    },
    end_date: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    required_period: {
        type: String,
        trim: true
    },
    unit_rate: {
        type: Number,
        trim: true
    },
    person_required: {
        type: Number,
        trim: true
    },
    total_amount:{
        type: Number,
        trim: true
    },
    cgst:{
        type: Number,
        trim: true
    },
    sgst:{
        type: Number,
        trim: true
    },
    igst:{
        type: Number,
        trim: true
    }
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema)

module.exports = Project;