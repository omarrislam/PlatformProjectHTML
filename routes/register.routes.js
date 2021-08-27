const app=require('express').Router()
const validation=require('../validation/register.validation')
const userModel=require('../models/user.model')
const bcrypt=require('bcrypt')
const {validationResult } = require('express-validator');


app.get('/register', (req, res) => {
    req.session.register=true
    res.render('register.ejs',{title:req.session.register,isLoggedIn:false,titlehome:false,oldInputs:req.flash('oldInputs'),errors:req.flash('errors'),exists:req.flash('exists')})

    })

app.post('/HandleSignup',validation,async(req,res)=>{
    const{fname,lname,uname,password,email}=req.body
    let errors=validationResult(req)
    if(errors.isEmpty()){
        let data= await userModel.findOne({email})
        console.log(data);
        if(data!=null){
            req.flash('exists',true)
            req.flash('oldInputs',{fname,lname,uname,email})

          //  console.log('exists');
        }else{
           await bcrypt.hash(password,7,async(err,hash)=>{
              await userModel.insertMany({
                fname,lname,uname,password:hash,email
               })
           })

        }
    }else{
       //console.log('validation error');
        req.flash('errors',errors.array())
        req.flash('oldInputs',{fname,lname,uname,email})
        //console.log(errors.array());
    }
    //console.log(req.body);
    res.redirect('/register')
})
module.exports=app
