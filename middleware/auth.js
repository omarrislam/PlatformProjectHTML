module.exports.home=(req,res,next)=>{
if(req.session.isLoggedIn){
    next()
}else{
    res.redirect('/')
}
}

module.exports.login=(req,res,next)=>{
    if(!req.session.isLoggedIn){
        next()
    }else(
        res.redirect('/home')
    )
}

