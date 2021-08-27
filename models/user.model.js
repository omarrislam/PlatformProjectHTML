const mongoose = require('mongoose');

const userSchema=mongoose.Schema({
fname:String,
lname:String,
uname:String,
email:String,
password:String
})

const userModel=mongoose.model('user',userSchema)

module.exports= userModel