const {
    insertTask,
    updatetask,
    getTasks,
    deleteTask,
    getTask
  
  } = require("../controller/task");
  const express = require("express");
  const { tokenverify } = require("../function/tokenverify");
const router = express.Router();

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
 *                  
 *                  name: Task name
 *                  dec: about task
 *                 
 */

/**
 * @swagger
/users/insertTask:
 *  post:
 *      summary: insert Task
 *      tags: [Task]
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


/**
 * @swagger
 * /users/updatetask/{id}:
 *    put:
 *      summary: Update Task
 *      tags: [Task]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *              required: true
 *              description: this is the id for Task
 *    
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
 router.put("/users/updatetask/:id", tokenverify, updatetask);



/**
 * @swagger
 *  /users/getTasks:
 *   get:
 *     summary: Returns the list of all the Task
 *     tags: [Task]
 *     parameters:
 *          - in: query
 *            name: limit
 *            schema:
 *              type: intiger
 *              description: this is page of records
 *          - in: query
 *            name: page
 *            schema:
 *              type: intiger
 *          - in: query
 *            name: short
 *            schema:
 *              type: string
 *              description: this is short of records        
 *     responses:
 *       200:
 *         description: The list of the Task
 *         content:
 *           application/json:
 *               schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
router.get("/users/getTasks", getTasks);

/**
 * @swagger
 * /users/deleteTask/{id}:
 *    delete:
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
 *          '200':  
 *              description: success
 *          '500':
 *                  description: Internal server error
 */
 router.delete("/users/deleteTask/:id", deleteTask);
 
/**
 * @swagger
 * /users/getTask/{id}:
 *    get:
 *      summary: get Task
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
 *          '200':  
 *              description: success
 *          '500':
 *                  description: Internal server error
 */
 router.get("/users/getTask/:id", getTask);

 module.exports = router;

