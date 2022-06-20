const {
  insertUser,
  findoneUser,
  varifyUsre,
  creatUser,
  instertask,
  updateTask,
  findoneTask,
  getTask,
  deleteTask,
  getUser,
  pagination,shortTask,getUsertask
} = require("../model/usre");
const {registervalidation}=require("../function/validatetion");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = "verysecretkey";


exports.creatuser = async (request, response) => {
  const results = await creatUser();
  console.log("table created", results);
  response.status(200).json({ status: true, Msg: "table created" });
};
exports.insertuser = async (request, response) => {
  const { email, password } = request.body;
  let validet = registervalidation({ email, password });
  console.log(";;;;", validet);
  if (validet.error) {
    return response.json({ status: false, error: error.details[0].message });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    try {
      let data = await findoneUser(email, password);

      console.log("data....", data.rows);
      if (data.rows.length == 1) {
        response.json({
          status: false,
          msg: "user alredy exist",
        });
      } else {
        let data = await insertUser(email, hashPassword);

        console.log(`User added with ID: ${data.rows}`);
        response.json({
          status: "true",
          data: data.rows,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
};
exports.login = async (request, response) => {
  const { email, password } = request.body;
  if (!email) {
    console.log(">>>>>>>>>>>>", email);
    response.json({
      status: false,
      msg: "email is required",
    });
  }
  if (!password) {
    console.log(">>>>>>>>>>>>", email);
    response.json({
      status: false,
      msg: "password is required"
    });
  }

  let data = await findoneUser(email, password);

  if (data.rows.length > 0) {
    let pass = data.rows[0].password;
    console.log("results,,,,,,", data.rows[0].password);
    const hashPassword = await bcrypt.compare(password, pass);
    console.log(hashPassword);
    if (hashPassword == true) {
      let data = await varifyUsre(email, pass);
      //
      //console.log(data.rows);

      console.log(data.rows);
      const options = {
        expiresIn: "24h",

        audience: String(data.rows[0].id),
      };
      jwt.sign({ id: data.rows[0].id }, key, options, (err, token) => {
        if (err) {
          console.log(err);
          response.json({
            status: false,
            msg: err,
          });
        } else {
          response.header("token", token).status(200).send({
            status: true,
            token: token,
            msg: "success",
          });
        }
      });
    } else {
      response.json({
        status: false,
        msg: "invailid crdentional",
      });
    }
    //   response.status(200).json({status: true,
    // results:results.rows});
  } else {
    response.json({
      status: false,
      msg: "invailid crdentional",
    });
  }
};

exports.insertTask = async (request, response) => {
  const { name, dec, user_id } = request.body;
  if (!name) {
    console.log(">>>>>>>>>>>>", name);
    response.json({
      status: false,
      msg: "name is required",
    });
  }else{
    let token
    let {authorization} = request.headers;
  console.log(authorization)
if(authorization){
token= authorization.split(' ')[1]
}
    console.log(",,,,,,,,,,,,", request.headers.token);

  
  if(request.headers.token){
    token=request.headers.token
  }
  const data = jwt.decode(token);
  console.log(",,,,,,,,,,,,", data);
  const iddd = data.aud;
  console.log(data.aud);
  let results = await instertask(name, dec, iddd);
  console.log("User added with ID:", results.rows);
  response.json({
    status: "true",
    data: results.rows,
  });
}
};

exports.updatetask = async (request, response) => {
  let {authorization} = request.headers;

  let token= authorization.split(' ')[1]

  console.log(",,,,,,,,,,,,", token);
  const data = jwt.decode(token);
  const iddd = data.aud;

  console.log(data.aud);
  const id = request.params.id;
  let task = await findoneTask(id);
  let tname = task.rows[0].name;
  let tdec = task.rows[0].dec;
  console.log(task.rows);
  let { name, dec } = request.body;
  if (!name) {
    console.log(">>>>>>>>>>>>", tname);
    name = tname;
  }
  if (!dec) {
    dec = tdec;
  }

  console.log(request.body.name);
  let results = await updateTask(name, dec, iddd, id);
  console.log(results.rows);
  response.status(200).json({
    status: true,
    data: results.rows,
  });
};
exports.getTask = async (request, response) => {
  const pageno = request.query.page;
  const name = request.query.name;
  const short = request.query.short;
console.log("short",short)
     const pageSize = pageno;
     

      const limitValue = request.query.limit||5;
      const skipValue = 5 * (pageSize - 1);
    
    console.log(name);
    console.log("::::::::::",limitValue,skipValue,short)
    let results = await pagination(limitValue, skipValue,short);
    console.log(">>>>>>", results.rows);
    response.json({
      status: true,
      data: results.rows,
    });
  
  //shorted list accending

  // if (short) {
  //   console.log(short)
  //   let value = await shortTask(short);
  //   console.log(value.rows);
  //   response.json({
  //     status: true,
  //     data: value.rows,
  //   });
  // }

  // let records = await getTask();
  // response.json({
  //   status: true,
  //   results: records.rows,
  // });

};

exports.deleteTask = async (request, response) => {
  let id = request.params.id;
  let task = await deleteTask(id);
  response.status(200).json({
    status: true,
    msg: "1 record Deleted",
  });
  console.log("1 record Deleted")
};
exports.getUser = async (request, response) => {
  let task = await getUser();
  response.status(200).json({
    status: true,
    data: task.rows,
  });
};
exports.getUserTask=async (request, response) => {
  const token = request.headers.user_token;
  const data = jwt.decode(token);
  console.log(",,,,,,,,,,,,", data);
  const userid = data.aud;
  console.log(userid);
  let task= await getUsertask(userid)
  response.status(200).json({
    status: true,
    data: task.rows,
  });
}