const app=require('express').Router()
const userModel=require('../models/user.model')
const bcrypt=require('bcrypt')
const auth=require('../middleware/auth')

app.get('/',auth.login,(req, res) => {

    res.render('login.ejs',{title:false,isLoggedIn:false,titlehome:false,dexist:req.flash('dexist'),wpass:req.flash('wpass'),oldInputs:req.flash('oldInputs')})
    })

app.post('/HandleSignin',async(req,res)=>{
    const{email,password}=req.body
    let data=await userModel.findOne({email})
    //console.log(data);
    if(data!=null){
        let match= await bcrypt.compare(password,data.password)
        if(match){
            req.session.userID=data._id
            req.session.fname=data.fname
            req.session.lname=data.lname
            req.session.isLoggedIn=true
            res.redirect('/home')
        }else{
            req.flash('wpass',true)
            req.flash('oldInputs',{email})
            console.log('incorrect password');
            res.redirect('/')

        }
    }else{
        req.flash('dexist',true)
        res.redirect('/')

    }
    //console.log(data);
})

module.exports=app
