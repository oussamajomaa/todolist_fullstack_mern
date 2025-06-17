const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required:true
    },
    role: {
        type: String,
        default:'user'
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {timestamps: true}) // Il va ajouter deux champs createdAt et updatedAt

const User = mongoose.model('User', userSchema)
module.exports = User
// module.exports = mongoose.model('User', userSchema)