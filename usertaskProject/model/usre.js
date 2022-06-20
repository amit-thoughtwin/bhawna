const Pool = require("pg").Pool;
require('dotenv').config()

const pool = new Pool({
  user: process.env.USER_DB,
  host: process.env.DB_HOST,
  database: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.port,
});

exports.creatUser = async () => {
  return pool.query
  (
    "CREATE TABLE task_2 (id SERIAL, name character(50), dec character(200), user_id integer REFERENCES info(id));"
  );
};
exports.findoneUser = async (email, password) => {
  return pool.query("SELECT * FROM info WHERE email=$1", [email]);
};

exports.insertUser = (email, hashPassword) => {
  return pool.query(
    "INSERT INTO info (email, password) VALUES ($1, $2) RETURNING *",
    [email, hashPassword]
  );
};
exports.varifyUsre = async (email, pass) => {
  return pool.query("SELECT * FROM info WHERE email = $1 AND password = $2", [
    email,
    pass,
  ]);
};


exports.getUsertask = async (userid)=>{
  return pool.query(`SELECT	*  FROM	task_2 WHERE user_id  = ${userid}`)

}
exports.findUser = async (id)=>{
  return pool.query(`SELECT	email FROM	info WHERE id  = ${id}`)

}
exports.getUser = async (id)=>{
  return pool.query(`SELECT	* FROM	info `)

}