const app=require('express').Router()
const postModel=require('../models/post.model')

app.get('/profile',async (req, res) => {
  let posts=  await postModel.find({userID:req.session.userID}).populate('userID','-_id -uname -email -password -__v').sort({ date: -1 })
  //console.log(posts);
    res.render('profile.ejs',{title:false,isLoggedIn:req.session.isLoggedIn,titlehome:false,posts,fname:req.session.fname,lname:req.session.lname})
    })

app.post('/HandleDelete',async(req,res)=>{
    await postModel.findByIdAndDelete({_id:req.body.delete})
    res.redirect('/profile')
})

app.post('/HandleEdit',async(req,res)=>{
    const{edit,title,desc}=req.body
    //console.log(req.body.edit);
    await postModel.findByIdAndUpdate({_id:req.body.edit},{title,desc})
    res.redirect('/profile')
})

module.exports=app
