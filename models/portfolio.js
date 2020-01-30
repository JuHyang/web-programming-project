const mongoose = require('mongoose')
const Schema = mongoose.Schema



var Portfolio = new Schema({
    title: String,
    description: String,
    orgPhotoName: String,
    photo: String,
    userID: String
})

Portfolio.statics.create = function (title, description, orgPhotoName, photo, userID) {
    const portfolio = new this({
        title, description, orgPhotoName, photo, userID
    })

    // return the Promise
    return portfolio.save()
}


Portfolio.statics.getPortfoliosByUserID = function (userID) {
    if (userID === null || typeof (userID) == 'undefined') {
        throw new Error('userID is null')
    }
    return this.find({
        userID
    }).exec()
}

Portfolio.statics.getPortfolioByID = function (userID, protfolioID) {
    if (userID === null || typeof (userID) == 'undefined') {
        throw new Error('userID is null')
    }

    if (protfolioID === null || typeof (protfolioID) == 'undefined') {
        throw new Error('protfolioID is null')
    }
    return this.findOne({
        _id: protfolioID,
        userID
    }).exec()
}

Portfolio.statics.deleteByID = function (userID, portfolioID) {
    if (userID === null || typeof (userID) == 'undefined') {
        throw new Error('userID is null')
    }

    if (portfolioID === null || typeof (portfolioID) == 'undefined') {
        throw new Error('portfolioID is null')
    }

    return this.deleteOne({
        _id: portfolioID,
        userID
    })
}

Portfolio.methods.edit = function (title, description) {
    this.title = title
    this.description = description

    return this.save()
}


module.exports = mongoose.model('portfolio', Portfolio)