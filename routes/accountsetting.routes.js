const app=require('express').Router()
const userModel=require('../models/user.model')
const bcrypt=require('bcrypt')
const validation=require('../validation/accountsetting.validation')
const { validationResult } = require('express-validator');

app.get('/accountsetting', (req, res) => {
    res.render('accountsetting.ejs',{title:false,isLoggedIn:req.session.isLoggedIn,titlehome:false,incpassword:req.flash('incpassword'),success:req.flash('success'),errors:req.flash('errors')})
    })

app.post('/HandleAccountsetting',validation,async(req,res)=>{
    const{newpassword,oldpassword,repassword}=req.body
    let errors=validationResult(req)
    let data=await userModel.findOne({_id:req.session.userID})
    let match=await bcrypt.compare(oldpassword,data.password)
    if(errors.isEmpty()){
        if(match){
            bcrypt.hash(newpassword,7,async(err,hash)=>{
    
                await userModel.findByIdAndUpdate({_id:req.session.userID},{password:hash})
                
            })
            req.flash('success',true)
    
        }else{
            //console.log('wrong pass');
            req.flash('incpassword',true)
        }
    }else{
        //console.log(errors.array());
        req.flash('errors',errors.array())
    }
    
    //console.log(req.body);
    res.redirect('/accountsetting')
})

module.exports=app
