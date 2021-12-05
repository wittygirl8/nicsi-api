const jwt = require('jsonwebtoken')
const Candidate = require('../models/candidate.model');

const userAuth = async (req, res, next) => {
    try{
        console.log('===',req.headers)
        const token = req.headers.authorization.replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisismynewcourse')
        const user = await Candidate.findOne({ _id: decoded._id, 'tokens.token': token })
        // console.log(user)
        const role = user.type
        // console.log(user.role.role)
        
        if(role === "candidate" || role === "user"){
            req.user = user
        }else{
            return res.status(401).send({
                message:'Unautherized Access!',
                status: 401
            })
        }
        next()
        
    }catch(e){
        console.log(e)
        return res.status(401).send({
            message:'Invalid token!',
            status: 401
        })
    }
}

module.exports = userAuth;