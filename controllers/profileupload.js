const multer=require('multer');
const users=require('../models/users');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage }).single('profile');

module.exports.uploadpic=(req,res)=>{
    
    upload(req,res,(err)=>{
        // console.log(req.file);
        // console.log(req.body);
        if(err){
            res.json({msg:'something is wrong'})
        }
        else{
            if(req.file===undefined){
                res.json({msg:'file is  invalid'})
            }
            else{
                console.log(req.file);
                users.findById(req.body.id)
                .then((user)=>{
                    console.log(req.body)
                    if(req.body.name==='profilepic'){
                        const profilepic='uploads/'+req.file.filename;
                        user.profilephoto=profilepic;
                    }
                    else{
                        const coverpic=req.file.path;
                        user.coverphoto=coverpic;
                    }
                    
                    user.save().then(console.log(user));
                   return res.json({msg:'image updated successfully'});
                
                })

            }


        }

    })
    // uploadCover(req,res,(err)=>{
    //     console.log(req.file);
    //     if(err){
    //         res.json({msg:'something is wrong'})
    //     }
    //     else{
    //         if(req.file===undefined){
    //             res.json({msg:'file is  invalid'})
    //         }
    //         else{
    //             users.findById(req.body.id)
    //             .then((user)=>{
    //                 const coverpic='uploads/'+req.file.filename;
    //                 user.coverphoto=coverpic;
    //                 user.save().then(console.log(user));
    //               return  res.json({msg:'cover pic updated successfully'});
                
    //             })

    //         }


    //     }

    // })
    // console.log(req.file);
    // console.log(req.body);


    

}
// console.log(req.file)
    // console.log(req.body);
//     var img = fs.readFileSync(req.file.path);
//  var encode_image = img.toString('base64');
// //  Define a JSONobject for the image attributes for saving to database
 
//  var finalImg = {
//       contentType: req.file.mimetype,
//       image:  new Buffer.from(encode_image, 'base64')
//    };
        // upload(req, res, function (err) {
        //     if (err instanceof multer.MulterError) {
        //         return res.status(500).json(err)
        //     } else if (err) {
        //         return res.status(500).json(err)
        //     }
        // return res.status(200).send(req.file)

        // })