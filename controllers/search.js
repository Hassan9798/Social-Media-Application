const users=require('../models/users');
module.exports.search=async (req,res)=>{
        const SearchField=req.query.name;
        if(SearchField===''){
            res.send([]);
        }
        else{
            await users.find({fullname:{$regex:SearchField,$options:'$i'}})
            .then((user)=>{
                if(Object.keys(user).length===0){
                    res.status(200).send([{fullname:'no match found'}]);
                }
                else{
                  res.status(200).send(user);
      
                }
            })
            .catch(err=>res.status(500).json(err));

        }
        
    


}