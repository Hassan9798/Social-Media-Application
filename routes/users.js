const express =require('express');
const router=express.Router();
const users=require('../controllers/users');
// const {upload}= require('../controllers/users');

router.post('/register',users.register);
router.get('/getuser/:id',users.getUser);
router.put('/:id/follow',users.followUser);
router.put('/:id/unfollow',users.unfollowUser);
router.get('/:id/getfriends',users.getFriends);

module.exports=router;
