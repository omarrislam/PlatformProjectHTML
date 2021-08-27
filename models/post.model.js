const mongoose = require('mongoose');

const postSchema=mongoose.Schema({
title:String,
desc:String,
date:Date,
userID:{type:mongoose.Schema.Types.ObjectId,ref:'user'}

})

const postModel=mongoose.model('post',postSchema)

module.exports= postModel