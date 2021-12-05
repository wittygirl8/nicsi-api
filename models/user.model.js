const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const userRegisterSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    designation: {
        type: String,
        trim: true,
    },
   
    skills: {
        type: String,
        trim: true,
    },
    expereince: {
        type: String,
        trim: true,
    },
    user_name: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        trim: true,
    },
    contact_number: {
        type: Number,
        trim: true,
    },
    type: {
        type: String,
        trim: true,
    },
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }],
    tokens: [{
        token: {
            type: String,
        }
    }]
}, { timestamps: true });

userRegisterSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
});

userRegisterSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne( { email })
    if(!user){
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user
}

userRegisterSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()}, "thisismynewcourse")
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}


const User = mongoose.model('User', userRegisterSchema)

module.exports = User