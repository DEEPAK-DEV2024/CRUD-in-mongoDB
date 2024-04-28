const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/testUser')

const user = mongoose.Schema({
    username: String,
    email: String,
    imgurl: String
})

module.exports = mongoose.model('users', user)