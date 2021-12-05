const User = require('../models/user.model');
const Project = require('../models/project.model');
class UserController {
    static createUser = async (req, res) => {
        try {
            console.log(req.body)
            const data = new User(req.body.dataRequest)
            await data.save()
            console.log(data);
            res.status(200).send({
                status: 200,
                data
            });
        }catch (error) {
            res.status(400).send({
                status: 400,
                message: error.message
            });
        }
    }
    static getAllUser = async (req, res) => {
        try{
            const dataUser = await User.find().populate('projects')
            if (dataUser.length != 0) {
                res.status(200).send({
                    status: 200,
                    dataUser
                })
            }
        }catch (error) {
            res.status(404).send({
                message: error.message
            });
        }
    }
    static getUserById = async (req, res) => {
        try{
            console.log(req.body)
            const dataUser = await User.findById(req.body.id).populate('projects')
            if (dataUser.length != 0) {
                res.status(200).send({
                    status: 200,
                    dataUser
                })
            }
        }catch (error) {
            res.status(404).send({
                message: error.message
            });
        }
    }
    static updateUser = async (req, res) => {
        try{
            console.log(req.body)
            const dataUser = await User.findOneAndUpdate({
                _id: req.body.id
            }, req.body.dataRequest)
            if (dataUser.length != 0) {
                res.status(200).send({
                    status: 200,
                    dataUser
                })
            }
        }catch (error) {
            res.status(404).send({
                message: error.message
            });
        }
    }
    static deleteUser = async (req, res) => {
        try{
            console.log(req.body)
            const dataUser = await User.findByIdAndDelete({
                _id: req.body.id
            })
            if (dataUser.length != 0) {
                res.status(200).send({
                    status: 200,
                    dataUser
                })
            }
        }catch (error) {
            res.status(404).send({
                message: error.message
            });
        }
    }
    static getUserProjectById = async (req, res) => {
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
}

module.exports = UserController;