const {insertUser, login,getUser}=require('../controller/user')
const express = require("express");
const router = express.Router();
router.post('/User',insertUser)
router.post('/login',login)
router.get('/user',getUser)
module.exports=router