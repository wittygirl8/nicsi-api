require('dotenv').config()
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const Candidate = require('../models/candidate.model');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
})

class CandidateController {
    static getApprovedCandidate = async (req, res) => {
        try {
            const dataUser = await Candidate.find({
                status: {
                    $eq: 'Approved'
                }
            })
            if (dataUser.length != 0) {
                res.status(200).send({
                    status: 200,
                    dataUser
                })
            }
        }catch(error) {
            res.status(404).send({
                status: 404,
                message: error.message
            });
        }
    }
    static getPendingCandidates = async (req, res) => {
        try{
            const dataUser = await Candidate.find({
                status: {
                    $eq: 'pending'
                }
            })
            if (dataUser.length != 0) {
                res.status(200).send({
                    status: 200,
                    dataUser
                })
            }
        } catch(error) {
            res.status(404).send({
                status: 404,
                message: error.message
            });
        }
    }
    static updatePendingCandidates = async (req, res) => {
        try{
            console.log(req.body)
            const dataUser = await Candidate.findOneAndUpdate({
                _id: req.body.dataRequest._id
            },{
                status: req.body.dataRequest.status
            })
            if (dataUser.length != 0) {
                res.status(200).send({
                    status: 200,
                    dataUser
                })
            }
        } catch(error) {
            res.status(404).send({
                status: 404,
                message: error.message
            });
        }
    }
    
    static getRejectCandidates = async (req, res) => {
        try{
            const dataUser = await Candidate.find({
                status: {
                    $eq: 'reject'
                }
            })
            if (dataUser.length != 0) {
                res.status(200).send({
                    status: 200,
                    dataUser
                })
            }
        } catch(error) {
            res.status(404).send({
                status: 404,
                message: error.message
            });
        }
    }
    static getCandidateId = async (req, res) => {
        try {
            const user = await Candidate.findById(req.body.id);
            if(user.length !== 0) {
                res.status(200).send({
                    status: 200,
                    user
                })
            }
        } catch(error) {
            res.status(404).send({
                status: 404,
                message: error.message
            })
        }
    }
    static uploadDocument = async (req, res) => {
        try{
            console.log(req.body, req.file, req.user)
            let myFile = req.file.originalname.split(".")
            const fileType = myFile[myFile.length - 1]

            const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: `${req.body.name}.${fileType}`,
                Body: req.file.buffer
            }
            console.log(params)

            s3.upload(params,async (error, data) => {
                if(error){
                    res.status(500).send({
                        status: 500,
                        message: error.message
                    })
                }
                if(req.body.name == 'adhar'){
                    req.user.adhar_card = data.Location
                    console.log(req.user.adhar_card,data.Location)
                    await  req.user.save()
                    res.status(200).send({
                        status: 200,
                        message: req.user
                    })
                }else if(req.body.name == 'pan_card'){
                    req.user.pan_card = data.Location
                    await  req.user.save()
                    res.status(200).send({
                        status: 200,
                        message: req.user
                    })
                }else if(req.body.name == 'address_proof'){
                    req.user.address_proof = data.Location
                    await  req.user.save()
                    res.status(200).send({
                        status: 200,
                        message: req.user
                    })
                }else if(req.body.name == 'tenth_marksheet'){
                    req.user.tenth_marksheet = data.Location
                    await  req.user.save()
                    res.status(200).send({
                        status: 200,
                        message: req.user
                    })
                }else if(req.body.name == 'twelfth_marksheet'){
                    req.user.twelfth_marksheet = data.Location
                    await  req.user.save()
                    res.status(200).send({
                        status: 200,
                        message: req.user
                    })
                }
                
            })
        } catch(error) {
            res.status(404).send({
                status: 404,
                message: error.message
            });
        }
    }
    static updateDesignation = async(req, res) =>{
        try{
            console.log(req.body)
            const dataUser = await Candidate.findOneAndUpdate({
                _id: req.body.dataRequest._id
            },{
                designation_name: req.body.dataRequest.designation_name,
                projects:req.body.dataRequest.projects
            })
            if (dataUser.length != 0) {
                res.status(200).send({
                    status: 200,
                    dataUser
                })
            }
        }
        catch(error) {
            res.status(404).send({
                status: 404,
                message: error.message
            });
        }
    }
    static getAllCandidateByProject = async(req, res) =>{
        try {
            console.log('req.body.projects',req.body.id)
            const candidate = await await Candidate.find({
                projects:{
                    $in: [req.body.id]
                }
            })
            console.log(candidate)
            if(candidate.length !== 0) {
                res.status(200).send({
                    status: 200,
                    candidate
                })
            }
        } catch (error) {
            res.status(404).send({
                status: 404,
                message: error.message
            })
        }
    }

    static updateAttendance = async(req, res) =>{
        try{
            console.log(req.body)
            const dataUser = await Candidate.findOneAndUpdate({
                _id: req.body.dataRequest._id
            },{
                $push: {attendance: req.body.dataRequest.attendance}
            })
            if (dataUser.length != 0) {
                res.status(200).send({
                    status: 200,
                    dataUser
                })
            }
        }
        catch(error) {
            res.status(404).send({
                status: 404,
                message: error.message
            });
        }
    }
}

module.exports = CandidateController;