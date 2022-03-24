const bcrypt=require('bcrypt');
const { promise } = require('bcrypt/promises');
const users=require('../models/users');

module.exports.register=async (req,res,next)=>{
const user= await users.find({email:req.body.email})
const isEmpty=Object.keys(user).length===0;

if(isEmpty===false){
    res.json({msg:"this email is already registered"});
}

else{
    const salt= await bcrypt.genSalt(10);
    const hashpassword=await bcrypt.hash(req.body.password,salt);
    let User=await new users({
    fullname:req.body.fullname,
    email:req.body.email,
    password:hashpassword,
    profilephoto:'posts/avatar1.png',
    coverphoto:'posts/avatar1.png'
    });
    console.log(User);
    User.save().then(
        res.json({msg:'user save success fully',User})
                
    ); 
}
};
module.exports.followUser=async(req,res)=>{
    

if(req.body.userId!==req.params.id){
try{
const user=await users.findById(req.params.id);
const currentuser=await users.findById(req.body.userId)
// console.log(user,currentuser)

if(!user.followings.includes(req.body.userId)){

user.followings.push(req.body.userId)
await user.save()
          .then((result)=>{
            console.log(result)
            res.status(200).json({msg:'user has been followed',result});
});
currentuser.follower.push(req.params.id)
await currentuser.save();


// await user.updateOne({$push:{followings:req.body.userId}})
//         .then((result)=>{
//             console.log(result);
//         })
// await currentuser.updateOne({$push:{follower:req.params.id}})
// res.status(200).json({msg:'user has been followed',user});


}
else{
    console.log('h')
    res.status(403).json('already follow this user')
}


}
catch(err){
    res.status(500).send(err);
}


}
else{
    res.status(403).json('you cant follow yourself')
}
    

}
module.exports.unfollowUser=async(req,res)=>{
    if(req.body.userId!==req.params.id){
        try{
        const user=await users.findById(req.params.id);
        const currentuser=await users.findById(req.body.userId);
        if(user.followings.includes(req.body.userId)){
            user.followings.pull(req.body.userId)
            await user.save()
                    .then((result)=>{
                        console.log(result)
                        res.status(200).json({msg:'user has been unfollowed',result});
            });
        // await user.updateOne({$pull:{followings:req.body.userId}})
        await currentuser.updateOne({$pull:{follower:req.params.id}})
        // console.log('user has been un followed');
        res.status(200).json('user has been unfollowed',user);
        
        
        
        }
        else{
            res.status(403).json('already unfollow this user')
        }
        
        
        }
        catch(err){
            res.status(500).send(err);
        }
        
        
        }
        else{
            res.status(403).json('you cant unfollow yourself')
        }
    
}
module.exports.getUser=(req,res)=>{
    users.findById(req.params.id)
    .then((user)=>{
        res.send(user)
            
    })
    .catch(err=>console.log(err))

}
module.exports.getFriends=async(req,res)=>{
    
try{
const user=await users.findById(req.params.id);
const friends= await Promise.all(
    user.followings.map((friendid)=>{
        return users.findById(friendid);
    })
)

console.log(friends);
// let friendsList=[];
// friends.map((friend)=>{
//     const {_id,fullname,profilephoto}=friend;
//     friendsList.push(_id,fullname,profilephoto)
// })
res.status(200).json(friends);


}
catch(err){
    res.status(500).send(err);
}



}