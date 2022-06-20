const Pool = require("pg").Pool;
require('dotenv').config()
console.log(process.env.USER_DB)
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
exports.instertask = async (name, dec, iddd) => {
  return pool.query(
    "INSERT INTO task_2 (name, dec,user_id) VALUES ($1, $2,$3) RETURNING *",
    [name, dec, iddd]
  );
};

exports.updateTask = async (name, dec, iddd, id) => {
  return pool.query(
    "UPDATE task_2 SET name = $1, dec = $2 WHERE (user_id = $3 )and (id=$4)RETURNING *",
    [name, dec, iddd, id]
  );
};
exports.findoneTask = async (id) => {
  return pool.query("SELECT * FROM task_2 WHERE id=$1", [id]);
};
const getTask = async () => {
  return pool.query("SELECT * FROM task_2 ");
};
exports.deleteTask = async (id) => {
  return pool.query("DELETE FROM task_2 WHERE id = $1", [id]);
};
exports.getUser =async () => {
  return pool.query("SELECT * FROM info ");
};

const shortTask=async(short)=>{
  console.log(short);
  return  pool.query(`SELECT * FROM task_2 ORDER BY id ${short}`)
}
exports. pagination =async (limitValue,skipValue,short)=>{
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",limitValue,skipValue,short)
  //if(limitValue&&short&&skipValue){
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",limitValue,skipValue,short)
 return pool.query (`SELECT * FROM task_2 ORDER BY id ${short} LIMIT $1 OFFSET $2`,[limitValue,skipValue])
//  SELECT * FROM task_2 WHERE name LIKE '%sql%'  ORDER BY id DESC LIMIT 5  OFFSET 5
//  }
//  if(short){ return  shortTask(short)}
  if(!limitValue&&!short&&!skipValue){
    
//return getTask()
  }
}
const srechname = async (name)=>{
  return pool.query( "SELECT	*  FROM	task_2 WHERE name LIKE $1",[name])
}
exports.getUsertask = async (userid)=>{
  return pool.query(`SELECT	*  FROM	task_2 WHERE user_id  = ${userid}`)

}