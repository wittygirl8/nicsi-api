const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const adminRegisterSchema = new mongoose.Schema({
    fullname: {
        type: String,
        trim: true
    },
    designation_name: {
        type: String,
        trim: true,
    },
    date_of_joining: {
        type: String,
        trim: true,
    },
    date_of_birth: {
        type: String,
        trim: true,
    },
    current_flat: {
        type: String,
        trim: true,
    },
    current_premise: {
        type: String,
        trim: true,
    },
    current_road: {
        type: String,
        trim: true,
    },
    current_area: {
        type: String,
        trim: true,
    },
    current_pincode: {
        type: Number,
        trim: true,
    },
    current_state: {
        type: String,
        trim: true,
    },
    current_country: {
        type: String,
        trim: true,
    },
    permanent_flat: {
        type: String,
        trim: true,
    },
    permanent_premise: {
        type: String,
        trim: true,
    },
    permanent_road: {
        type: String,
        trim: true,
    },
    permanent_area: {
        type: String,
        trim: true,
    },
    permanent_pincode: {
        type: Number,
        trim: true,
    },
    permanent_state: {
        type: String,
        trim: true,
    },
    permanent_country: {
        type: String,
        trim: true,
    },
    father_name: {
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
    type: {
        type: String,
        trim: true,
    },
    father_name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        minlength:7,
        trim: true,
        
    },
    status: {
        type: String,
        trim: true
    },
    tokens: [{
        token: {
            type: String,
        }
    }]

}, { timestamps: true });

adminRegisterSchema.pre('save', async function (next) {
    const admin = this

    if (admin.isModified('password')) {
        admin.password = await bcrypt.hash(admin.password, 8)
    }
    next()
});

adminRegisterSchema.statics.findByCredentials = async (email, password) => {
    const admin = await Admin.findOne( { email })
    console.log(admin)
    if(!admin){
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, admin.password)
    console.log(isMatch)
    if(!isMatch){
        throw new Error('Unable to login')
    }
    return admin
}

adminRegisterSchema.methods.generateAuthToken = async function(){
    const admin = this
    const token = jwt.sign({_id:admin._id.toString()}, "thisismynewcourse")
    admin.tokens = admin.tokens.concat({token})
    await admin.save()
    return token
}


const Admin = mongoose.model('Admin', adminRegisterSchema)

module.exports = Admin