const bcrypt = require('bcryptjs')

const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,

        unique: true
    },

    email: {
        type: String,

        unique: true
    },

    password: String
})

UserSchema.pre('save', function(next){
    const user = this

    bcrypt.hash(user.password, 10, function(error, encrypted){
        user.password = encrypted
        next()
    })
})

module.exports = mongoose.model('User', UserSchema)