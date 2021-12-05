const Project = require('../models/project.model');
const { v4: uuidv4 } = require('uuid');
const WorkOrder = require('../models/work-order.model');
const { logoutCandidate } = require('./auth.controller');
class AdminController {
    static createProject = async (req, res) => {
        try {
            const requestData = {...req.body, project_number: uuidv4()}
            const data = new Project(requestData)
            await data.save()
            res.status(200).send({
                status: 200,
                data
            })
        } catch (error) {
            res.status(404).send({
                status: 404,
                message: error.message
            })
        }
    }
    static getAllProject = async (req, res) => {
        try {
            const project = await Project.find({});
            console.log(project)
            if(project.length !== 0) {
                res.status(200).send({
                    status: 200,
                    project
                })
            }
        } catch (error) {
            res.status(404).send({
                status: 404,
                message: error.message
            })
        }
    }
    static deleteProject = async (req, res) => {
        try {
            const project = await Project.findByIdAndDelete({_id: req.body.id})
            if(project.length !== 0) {
                res.status(200).send({
                    status: 200,
                    project
                })
            }
        } catch (error) {
            res.status(404).send({
                status: 404,
                message: error.message
            })
        }
    }
    

    

    static getProjectById = async (req, res) => {
        try {
            const data = await Project.findById(req.body.id);
            if(data.length !== 0) {
                res.status(200).send({
                    status: 200,
                    data
                });
            };
        }catch (error) {
            res.status(404).send({
                status: 404,
                message: error.message
            });
        }
    }

    static updateProject = async (req, res) => {
        try{
            const data = await Project.findOneAndUpdate({_id: req.body.DataRequest._id}, {
                hsn: req.body.DataRequest.hsn,
                name: req.body.DataRequest.name,
                start_date: req.body.DataRequest.start_date,
                end_date: req.body.DataRequest.end_date,
                description: req.body.DataRequest.description,
                person_required: req.body.DataRequest.person_required,
                required_period: req.body.DataRequest.required_period,
                unit_rate: req.body.DataRequest.unit_rate,
                total_amount: req.body.DataRequest.total_amount,
                cgst:req.body.DataRequest.cgst,
                sgst:req.body.DataRequest.sgst,
                igst:req.body.DataRequest.igst
                });
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

module.exports = AdminController;