const jwt = require('jsonwebtoken')
const User = require('../models/user.model');

const userAuth = async (req, res, next) => {
    try{
        const token = req.headers.authorization.replace('Bearer ', '')
        console.log('===',token)
        const decoded = jwt.verify(token, 'thisismynewcourse')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        // console.log(user)
        const role = user.type
        console.log(user)
        
        if( role === "user"){
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