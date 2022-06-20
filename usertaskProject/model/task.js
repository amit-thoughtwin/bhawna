const Pool = require("pg").Pool;
require('dotenv').config()

const pool = new Pool({
  user: process.env.USER_DB,
  host: process.env.DB_HOST,
  database: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.port,
});

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
   const getTaskall = async () => {
    return pool.query("SELECT * FROM task_2 ");
  };
  exports.getTask = async (id) => {
    return pool.query("SELECT *  FROM task_2 WHERE id = $1", [id]);
  };
  exports.deleteTask = async (id) => {
    return pool.query("DELETE FROM task_2 WHERE id = $1", [id]);
  };

  const shortTask=async(short)=>{
    console.log(short);
    return  pool.query(`SELECT * FROM task_2 ORDER BY ${short}`)
  }
  exports. pagination =async (limitValue,skipValue,short)=>{
  
    if(limitValue && short && skipValue>=0){
 
   return pool.query (`SELECT * FROM task_2 ORDER BY ${short} LIMIT $1 OFFSET $2`,[limitValue,skipValue])
  // SELECT * FROM task_2 WHERE name LIKE '%sql%'  ORDER BY id DESC LIMIT 5  OFFSET 5
    }else{
  if(short){ return  shortTask(short)}
    
  
  }
  return getTaskall()
   }
   
  
  const srechname = async (name)=>{
    return pool.query( "SELECT	*  FROM	task_2 WHERE name LIKE $1",[name])
  }