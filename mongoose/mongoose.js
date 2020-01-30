var mongoose = require('mongoose')

var db = mongoose.connection

db.on('error', console.error)

db.once('open', function () {
    console.log("Connected to mongod server")
})

exports.connectMongoose = function () {
    mongoose.connect('mongodb://localhost/webProgramming');
}