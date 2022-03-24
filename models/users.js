const mongoose=require('mongoose');
const users= new mongoose.Schema({
fullname:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
},
profilephoto:{
    type:String,
},
coverphoto:{
    type:String
},
follower:{
type:Array,
default:[]
},
followings:{
    type:Array,
    default:[]
}
},
{timestamps:true}
);

module.exports=mongoose.model('users',users);