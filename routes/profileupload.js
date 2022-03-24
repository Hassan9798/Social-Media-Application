const express=require('express');
const router=express.Router();
const profileupload=require('../controllers/profileupload');
router.post('/upload',profileupload.uploadpic);

module.exports=router;