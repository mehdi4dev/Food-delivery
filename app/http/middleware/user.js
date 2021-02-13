
module.exports=function (req,res,next) {
       if(req.user.role==='user')
              next();
       else
              return res.status(401).send('شما اجازه دسترسی به این دیتا را ندارید');    
            
}