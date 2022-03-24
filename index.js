const express=require('express');
const app=express();
const mongoose=require('mongoose');
const cors=require('cors');
const bodyParser = require('body-parser');
const Profileupload=require('./routes/profileupload');
const users=require('./routes/users');
const login=require('./routes/login');
const posts=require('./routes/posts');
const search=require('./routes/search');

mongoose.connect('mongodb://Hasan:hasan@cluster0-shard-00-00.7iiqm.mongodb.net:27017,cluster0-shard-00-01.7iiqm.mongodb.net:27017,cluster0-shard-00-02.7iiqm.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-y4lurw-shard-0&authSource=admin&retryWrites=true&w=majority',
                    { useNewUrlParser: true, useUnifiedTopology: true } )
.then(console.log('database connected'))
.catch(err=>console.log(err));


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use('/store',users);
app.use('/store',login);
app.use('/store',Profileupload);
app.use('/store',posts);
app.use('/store',search);
app.use('/uploads',express.static('uploads'));
app.use('/posts',express.static('posts'));


app.listen(4000,()=>{
    console.log('app is running');
});