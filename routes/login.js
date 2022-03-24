const express=require('express');
const router=express.Router();
const User=require('../controllers/login');
router.post('/login',User.login);

module.exports=router;