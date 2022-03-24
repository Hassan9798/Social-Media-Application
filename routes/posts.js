const express=require('express');
const router=express.Router();
const Posts=require('../controllers/posts');
router.post('/createpost',Posts.createPost);
router.get('/getpost/:id',Posts.getpost);
router.get('/getallposts/:id',Posts.getallPosts);
router.put('/:id/likepost',Posts.likePost);
module.exports=router;