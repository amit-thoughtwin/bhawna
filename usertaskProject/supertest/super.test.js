const express = require("express");
//const app = express();
const supertest = require("supertest");
const app = require("../index.js");
const User = require("../router/user");
const router = express.Router();
const kill = require("kill-port");
const {
  // creatuser,
  // insertuser,
  // login,
 getUser,

  // me
} = require("../controller/user");

describe('Debug logging', () => {

  beforeEach(() => {
    kill(8080, "tcp");
  })
test("GET users", async function () {
  const res = await supertest(app).get("/users/getUser");
 //console.log(res.text)

  expect(res.statusCode).toBe(200);
  

});
})

test("Post Insertusers", async function () {
  const res = await supertest(app).post("/users/User") .send({email: "Prnay@gmail.com", password: "prnay@123" });
  console.log(res.text)
  expect(res.statusCode).toBe(200);
});
