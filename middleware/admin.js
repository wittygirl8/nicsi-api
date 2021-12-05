const jwt = require('jsonwebtoken')
// const User = require('../models/user.model')
const Admin = require('../models/admin.model')

const adminLogin = async (req, res, next) => {
    try{
        console.log("--->",req.headers)
        const token = req.headers.authorization.replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisismynewcourse')
        const user = await Admin.findOne({ _id: decoded._id, 'tokens.token': token })
        const role = user.type
        
        if(role==="admin"){
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

module.exports = adminLogin