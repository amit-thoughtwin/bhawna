const {insertTask,updatetask,getTasks,deleteTask}=require('../controller/task')
const { tokenverify } = require("../function/tokenverify");
const express = require("express");
const router = express.Router();
router.post('/task',tokenverify, insertTask)
router.put('/updatetask/:id',tokenverify, updatetask)
router.get('/getTasks',getTasks)
router.delete('/deleteTask/:id', deleteTask)
module.exports=router