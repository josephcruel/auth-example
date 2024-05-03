const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const config = require('../config')

const user = new Schema({
    username: String,
    password: String,
    admin: {type: Boolean, default: false}
})

// Create new user document 
User.statics.create = function(username, password) {
    const encrypted = crypto.createHash('sha1', config.secret)
                    .update(password)
                    .digest('base64')

    const user = new this ({
        username,
        password: encrypted
    })

    // return the Promise 
    return user.save()
}