const {
  creatuser,
  insertuser,
  login,
  insertTask,
  updatetask,
  getTask,
  deleteTask,
  getUser,
  getUserTask,
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

/**
 * @swagger
 * components:
 *      schemas:
 *          Task:
 *              type: object
 *              required :
 *                  - name
 *                  - dec
 *              properties:
 *                  id:
 *                      type: intiger
 *                  name:
 *                      type: string
 *                  dec:
 *                      type: string
 *                  user_id:
 *                       type: intiger 
 *              example:
 *                  id: 1
 *                  name: Task name
 *                  dec: about task
 *                  user_id: user Id
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
/users/insertTask:
 *  post:
 *      summary: test authorization
 *      tags: [Task]
 *      parameters:
 *          - in: header
 *            name: token
 *            schema:
 *      
 *              required: true
 *              description: use to test authorization JWT
 *      requestBody:
 *         required: true
 *         content:
 *                     application/json:
 *                      schema:
 *                         $ref: '#/components/schemas/Task'
 *      responses:
 *          '200':  
 *              description: success
 *          '500':
 *                  description: Internal server error
 */
router.post("/users/insertTask", tokenverify, insertTask);
router.post("/users/updatetask/:id", tokenverify, updatetask);
router.get("/users/getTask", getTask);

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
router.get("/users/getUser", getUser);

router.get("/users/getUSerTask", tokenverify, getUserTask);
/**
 * @swagger
 * /users/deleteTask/{id}:
 *    get:
 *      summary: delete Task
 *      tags: [Task]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *              required: true
 *              description: this is the id for Task
 *    
 *      responses:
 *       200:
 *         description: The Task delete
 *         content:
 *           application/json:
 *             
 */
router.get("/users/deleteTask/:id", deleteTask);
module.exports = router;
