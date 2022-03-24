const router=require('express').Router();
const Search=require('../controllers/search');
router.get('/search',Search.search);
module.exports=router;