const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const candidateRegisterSchema = new mongoose.Schema({
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }],
    attendance:[{
        type: Date,
        trim:true
    }],
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
    adhar_card: {
        type: String,
        trim: true
    },
    pan_card: {
        type: String,
        trim: true
    },
    address_proof: {
        type: String,
        trim: true
    },
    tenth_marksheet: {
        type: String,
        trim: true
    },
    twelfth_marksheet: {
        type: String,
        trim: true
    },
    tokens: [{
        token: {
            type: String,
        }
    }]
}, { timestamps: true });

candidateRegisterSchema.pre('save', async function (next) {
    const candidate = this

    if (candidate.isModified('password')) {
        candidate.password = await bcrypt.hash(candidate.password, 8)
    }
    next()
});

candidateRegisterSchema.statics.findByCredentials = async (email, password) => {
    const candidate = await Candidate.findOne( { email })
    console.log(candidate)
    if(!candidate){
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, candidate.password)
    console.log(isMatch)
    if(!isMatch){
        throw new Error('Unable to login')
    }
    console.log(candidate)
    return candidate
}

candidateRegisterSchema.methods.generateAuthToken = async function(){
    const candidate = this
    const token = jwt.sign({_id:candidate._id.toString()}, "thisismynewcourse")
    candidate.tokens = candidate.tokens.concat({token})
    await candidate.save()
    return token
}


const Candidate = mongoose.model('Candidate', candidateRegisterSchema)

module.exports = Candidate