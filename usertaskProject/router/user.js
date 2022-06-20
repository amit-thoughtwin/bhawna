const {
  creatuser,
  insertuser,
  login,
  
  getUser,
  getUserTask,
  me
} = require("../controller/user");
const { tokenverify } = require("../function/tokenverify");
const express = require("express");
const router = express.Router();
/**
 * @swagger
 * components:
 *      schemas:
 *          User:
 *              type: object
 *              required :
 *                  - email
 *                  - password
 *              properties:
 *                  id:
 *                      type: intiger
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *              example:
 *               
 *                  email: user@gmail.com
 *                  password: user@123
 *
 */


 router.get("/users/User", creatuser);

/**
 * @swagger
 * /users/User:
 *   post:
 *     summary: Create a new User
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 * 
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 
 */ 
 
router.post("/users/User", insertuser);
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: login User
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *      
 *     responses:
 *         
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 
 */ 
router.post("/users/login", login);

/**
 * @swagger
 *  /users/getUser:
 *   get:
 *     summary: Returns the list of all the Users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: The list of the Users
 *         content:
 *           application/json:
 *               schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/users/getUser", getUser)


router.get("/users/getUSerTask", tokenverify, getUserTask);

/**
 * @swagger
 *  /users/me:
 *   get:
 *     summary: Returns  User record
 *     tags: [User]
 *     responses:
 *       200:
 *         description: The record of the User
 *         content:
 *           application/json:
 *               schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/users/me", tokenverify, me);
module.exports = router;
