const mongoose=require('mongoose');
const posts= new mongoose.Schema({
desc:{
    type:String
    
},
image:{
    type:String
},
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'users'
},
likes:{
    type:Array,
    default:[]
}
},
{timestamps:true})
module.exports=mongoose.model('posts',posts);