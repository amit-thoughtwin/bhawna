const express = require("express");
const app = express();
const { Sequelize, Model, DataTypes } =require('sequelize')
const port =  3000;

const db = require("./src/models");
const User=require('./src/router/user')
const Task=require('./src/router/task')
app.get("/", (request, response) => {
    return response.json({ info: "Node.js, Express, and Postgres API" });
  });
  app.listen(port,
    () => {
   console.log(`App running on port ${port}.`);
 })

 app.use(express.json())
 db.sequelize.authenticate({logging:false}).then((conne)=>{console.log("db connected")}).catch(e=> console.log(e))

 app.use(User)
 app.use(Task)