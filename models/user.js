const mongoose = require('mongoose')
const crypto = require('crypto')
const Schema = mongoose.Schema
const config = require('../config')

var User = new Schema({
    studentNum: String,
    password: String,
    careers: String,
    briefCareers: String
})

User.statics.create = function (studentNum, password) {
    const encrypted = crypto.createHmac('sha1', config.secret)
        .update(password)
        .digest('base64')

    const user = new this({
        studentNum, password: encrypted
    })

    // return the Promise
    return user.save()
}

// find one user by using studentNum
User.statics.findOneByStudentNum = function (studentNum) {
    return this.findOne({
        studentNum
    }).exec()
}

// verify the password of the User documment
User.methods.verify = function (password) {
    const encrypted = crypto.createHmac('sha1', config.secret)
        .update(password)
        .digest('base64')
    return this.password === encrypted
}

User.methods.getCareers = function () {
    return this.careers
}

User.methods.pushCareer = function (career) {
    if (career === null || typeof (career) == 'undefined') {
        throw new Error('career is null')
    }
    this.careers = career
    this.save()
}

User.methods.getBriefCareers = function () {
    return this.briefCareers
}

User.methods.pushBriefCareer = function (briefCareer) {
    if (briefCareer === null || typeof (briefCareer) == 'undefined') {
        throw new Error('briefCareer is null')
    }
    this.briefCareers = briefCareer
    this.save()
}


module.exports = mongoose.model('user', User)