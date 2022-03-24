const bcrypt=require('bcrypt');
const users=require('../models/users');
module.exports.login=async(req,res)=>{
const User=await users.findOne({email:req.body.email})


if(User===null){
    res.json({msg:'incorrect email'});
}
else{
    try{
       await bcrypt.compare(req.body.password,User.password)
        .then(isMatch=>{
            if(isMatch){
                
                res.json({msg:'login successfully',User});
                
                
              
            }
            else{

                res.json({msg:'password is incorrect'});
            }
        })
        

    }
    catch(e){
        console.log(e);
    }
    
}
};