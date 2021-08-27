const app=require('express').Router()
const auth=require('../middleware/auth')
const postModel=require('../models/post.model')
app.get('/home',auth.home,async (req, res) => {
    req.session.isLoggedIn=true
    req.session.titlehome=true
    let posts=await postModel.find({}).populate('userID',' -uname -email -password -__v').sort({ date: -1 })
    
    res.render('home.ejs',{title:false,isLoggedIn:req.session.isLoggedIn,titlehome:req.session.titlehome,fname:req.session.fname,posts})
    //console.log(posts[0].userID._id);
    //console.log(req.session.userID);

    })

app.post('/HandleAdd',async(req,res)=>{
    const{title,desc}=req.body
    await postModel.insertMany({
        title,desc,userID:req.session.userID,date:Date.now()
    })
    res.redirect('/home')
})

app.get('/logout',(req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
})

module.exports=app
