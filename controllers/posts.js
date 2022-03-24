const posts=require('../models/posts');
const users=require('../models/users');
const multer=require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './posts')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage }).single('postimg');
module.exports.createPost=async(req,res)=>{
    upload(req,res,async(err)=>{
        if(err){
            console.log(err);
        }
        else{
            if(req.file===undefined){
                res.json({msg:'file is invalid'})
            }
            else{
                const image=req.file.path;
                let Post= await new posts({
                    desc:req.body.desc,
                    image:image,
                    user:req.body.user
                    })
                    Post.save()
                        .then((post)=>{
                            res.json({msg:'post uploaded successfully',post});
                        })
                        .catch(err=>{res.send(err)});
                }
        }
    })
    
}
module.exports.getpost=async (req,res)=>{
await posts.find({user:req.params.id}).populate('user').exec(function(err,Posts){
if(err){
    console.log(err);
}
res.send(Posts);


})
}

module.exports.getallPosts=async(req,res)=>{
    try{
 const user=await users.findById(req.params.id);
 
//  const getPosts=async(u)=>{
    await posts.find({user:{$in:user.followings}}).populate('user').exec(function(err,Posts){
          if(err){
              console.log(err)
          }
        //   console.log(Posts);
        return res.status(200).send(Posts);
          
          })
//    }
//  user.followings.map((u)=>
//  {
//     // return res.json(u)
//      getPosts(u);
//  })

 

    }
    catch(err){
        console.log(err)
    }
 
    
 
}
module.exports.likePost=async(req,res)=>{

    try{
        const post= await posts.findById(req.params.id)
        if(!post.likes.includes(req.body.userid)){

          await post.updateOne({$push:{likes:req.body.userid}})
            res.status(200).json('post has been liked');
    
        }
        else{
            await post.updateOne({$pull:{likes:req.body.userid}})
            res.status(200).json('post has been disliked');
        }

    }
    catch(err){
        res.status(500).send(err);
    }
}