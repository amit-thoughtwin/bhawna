const { tokenverify } = require("../function/tokenverify");
const { findtoken } = require("../supertest/function/findtoken");
const express = require("express");
//const app = express();
const supertest = require("supertest");
const app = require("../index.js");
const User = require("../router/user");
const router = express.Router();
test("GET Task", async function () {
  const res = await supertest(app).get("/users/getTasks");
  expect(res.statusCode).toBe(200);
});

test("Post InsertTask", async function () {
  const user = await supertest(app)
    .post("/users/login")
    .send({ email: "Pragya@gmail.com", password: "pragya@123" });
    let cookie= user.header["set-cookie"]
    let token = await findtoken(cookie)
  expect(user.status).toBe(200);
  const res = await supertest(app)
    .post("/users/insertTask")
    .set("token", ` ${token}`);

  expect(res.statusCode).toBe(200);
});
test("Delete Task", async function () {
  const res = await supertest(app).delete("/users/deleteTask/1");
  expect(res.statusCode).toBe(200);
});

test("Post Update", async function () {
  const user = await supertest(app)
    .post("/users/login")
    .send({ email: "Pragya@gmail.com", password: "pragya@123" });
   let cookie= user.header["set-cookie"]
let token = await findtoken(cookie)
 
   expect(user.status).toBe(200);
  const res = await supertest(app)
    .put("/users/updatetask/41")
   .set("token", ` ${token}`);
  console.log(res.text)

  expect(res.status).toBe(200);
});
