const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const secretKey = require('../../../config').API_SECRET

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: props => `${props.value} Invalid e-mail address`
        }
    },
    password: {
        type: String,
        required: true,
    },
    create: {
        type: Date,
        default: Date.now
    }
   
})

userSchema.methods.generateJWT = async function () {
    return jwt.sign({
        _id: this._id,
        email: this.name,
       
    }, secretKey)
}

const User = mongoose.model('user', userSchema)
module.exports = User