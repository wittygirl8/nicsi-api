const WorkOrder = require('../models/work-order.model');
const { v4: uuidv4 } = require('uuid');
class WorkOrderController {
    static createWorkOrder = async (req, res) => {
        try {
            const request_data = {...req.body, work_order_number: uuidv4()}
            const data = await WorkOrder(request_data);
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
    static getAllWorkOrder = async (req, res) => {
        try{
            const data = await WorkOrder.find({}).populate('project').populate('issue_to');
            if(data.length !== 0) {
                res.status(200).send({
                    status: 200,
                    data
                });
            };
        } catch (error) {
            res.status(404).send({
                status: 404,
                message: error.message
            });
        }
    }
    static deleteWorkOrder = async (req, res) => {
        try {
            console.log(req.body.id)
            const workOrder = await WorkOrder.findByIdAndDelete({_id: req.body.id});
            console.log(workOrder)
            if(workOrder.length !== 0) {
                res.status(200).send({
                    status: 200,
                    workOrder
                })
            }
        }catch (error) {
            res.status(404).send({
                status: 404,
                message: error.message
            });
        }
    }
    static getWorkOrderById = async(req, res) => {
        try{
            const data = await WorkOrder.findById(req.body.id).populate('project').populate('issue_to');
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
    static updateWorkOrder = async (req, res) => {
        try{
            console.log(req.body.DataRequest.project)
            const data = await WorkOrder.findByIdAndUpdate(req.body.DataRequest._id, {
                                                                                    issue_to: req.body.DataRequest.issue_to,
                                                                                    pi_number:req.body.DataRequest.pi_number,
                                                                                    project: req.body.DataRequest.project,
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

    static updateProject = async (req, res) => {
        try{
            const data = await Project.findOneAndUpdate({_id: req.body.DataRequest._id}, {
                name: req.body.DataRequest.name,
                start_date: req.body.DataRequest.start_date,
                end_date: req.body.DataRequest.end_date,
                description: req.body.DataRequest.description,
                person_required: req.body.DataRequest.person_required,
                required_period: req.body.DataRequest.required_period,
                unit_rate: req.body.DataRequest.unit_rate,
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

module.exports = WorkOrderController