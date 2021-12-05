const User = require('../models/user.model');
const Admin = require('../models/admin.model');
const Candidate = require('../models/candidate.model');
const jwt = require('jsonwebtoken')
const sendMail = require('../service/mail');
class AuthController {
    static  register = async (req, res) => {
        try {
            
                var data = new Candidate(req.body)
                await data.save();
                const emailDetails = {
                    emailList: [req.body.email, "mpr@aeologic.com"]
                };
                sendMail(emailDetails);
                res.status(200).send({
                    message: "Candidate Successfully Register",
                    data: data
                });
                
            
        } catch (error) {
            res.status(404).send({
                message: error.message
            });
        }
    };

    static UserLogin = async (req, res) => {
        try{
            console.log(req.body)
            const user = await User.findByCredentials(req.body.email, req.body.password)
            const token = await user.generateAuthToken()
            res.status(200).send({
                status: 200,
                message: 'Successfully Login',
                user,
                token
            })
        }catch (error) {
            res.status(404).send({
                status: 404,
                message: error.message
            });
        }
    }

    static CandidateLogin = async (req, res) => {
        try{
            console.log(req.body, "-->")
            const user = await Candidate.findByCredentials(req.body.email, req.body.password)
            const token = await user.generateAuthToken()
            res.status(200).send({
                status: 200,
                message: 'Successfully Login',
                user,
                token
            })
        }catch (error) {
            res.status(404).send({
                status: 404,
                message: error.message
            });
        }
    }

    static AdminLogin = async (req, res) => {
        try{
            console.log(req.body)
            const user = await Admin.findByCredentials(req.body.email, req.body.password)
            const token = await user.generateAuthToken()
            res.status(200).send({
                status: 200,
                message: 'Successfully Login',
                user,
                token
            })
        }catch (error) {
            res.status(404).send({
                status: 404,
                message: error.message
            });
        }
    }

    

    static getLoginUser = async (req, res) => {
       try{
            console.log(req.body.headers.Authorization)
            const token = req.body.headers.Authorization.replace('Bearer ', '')
            const decoded = jwt.verify(token, 'thisismynewcourse')
            const user = await User.findOne({ _id: decoded._id, 'tokens.token': token }).populate('projects')
            res.status(200).send({
                user
            })
       } catch (error) {
            res.status(404).send({
                message: error.message
            });
       }
    }

    static getLoginCandidate = async (req, res) => {
        try{
             console.log(req.body.headers.Authorization)
             const token = req.body.headers.Authorization.replace('Bearer ', '')
             const decoded = jwt.verify(token, 'thisismynewcourse')
             const user = await Candidate.findOne({ _id: decoded._id, 'tokens.token': token })
             res.status(200).send({
                 user
             })
        } catch (error) {
             res.status(404).send({
                 message: error.message
             });
        }
     }
 

    static getLoginAdmin = async (req, res) => {
        try{
             console.log(req.body.headers.Authorization)
             const token = req.body.headers.Authorization.replace('Bearer ', '')
             const decoded = jwt.verify(token, 'thisismynewcourse')
             const user = await Admin.findOne({ _id: decoded._id, 'tokens.token': token })
             res.status(200).send({
                 user
             })
        } catch (error) {
             res.status(404).send({
                 message: error.message
             });
        }
     }

    static getUserApprove = async (req, res) => {
        try {
            console.log("-----",req.body._id )
            const dataUser = await User.update({
                _id: req.body._id 
            },{
                $set: {
                    status: req.body.status
                }
            });
            if(dataUser) {
                res.status(200).send({
                    status: 200,
                    message: "Status Updated!"
                })
            }
        }catch (error) {
            res.status(404).send({
                message: error.message
            });
        }
    }

    static logoutAdmin = async (req, res) => {
        try {
                req.user.tokens = req.user.tokens.filter((token) => {
                return token.token !== req.body.token
                })
                console.log(req.user)
                await req.user.save()
                res.status(200).send({
                    status:200,
                    message: 'Successfully Logout!'
                })
        }catch(error) {
                res.status(500).send({
                status:500,
                message: error.message
            })
        }
    }
    static logoutUser = async (req, res) => {
        try {
                req.user.tokens = req.user.tokens.filter((token) => {
                    return token.token !== req.body.token
                })
                console.log(req.user)
                await req.user.save()
                res.status(200).send({
                    status:200,
                    message: 'Successfully Logout!'
                })
        }catch(error) {
                res.status(500).send({
                status:500,
                message: error.message
            })
        }
    }
    static logoutCandidate = async (req, res) => {
        try {
                req.user.tokens = req.user.tokens.filter((token) => {
                    return token.token !== req.body.token
                })
                console.log(req.user)
                await req.user.save()
                res.status(200).send({
                    status:200,
                    message: 'Successfully Logout!'
                })
        }catch(error) {
                res.status(500).send({
                status:500,
                message: error.message
            })
        }
    }
}

module.exports = AuthController;