const {
  insertUser,
  findoneUser,
  varifyUsre,
  creatUser,
  getUser,
  findUser,
  getUsertask
} = require("../model/usre");

const { registervalidation } = require("../function/validatetion");
const { ApiError,catchAsync}  = require("../function/handalerror");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = "verysecretkey";


exports.creatuser = catchAsync(async (request, response) => {
  //const results = await creatUser();
  throw new ApiError(404, "Error Message Not found"); 
  response.status(200).json({ status: true, Msg: "table created" });
});
exports.insertuser = catchAsync (async (request, response,next) => {
  const { email, password } = request.body;
  let validet = registervalidation({ email, password });

  if (validet.error) {
    return response.json({ status: false, error: error.details[0].message });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    try {
      let data = await findoneUser(email, password);

      if (data.rows.length == 1) {
      
      throw next(new ApiError(400,'Already exist'));
        
        response.json({
          status: false,
          msg: "user alredy exist",
        });
      } else {
        let data = await insertUser(email, hashPassword);

        response.json({
          status: "true",
          data: data.rows,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
});
exports.login = async (request, response) => {
  const { email, password } = request.body;
  if (!email) {
    response.json({
      status: false,
      msg: "email is required",
    });
  }
  if (!password) {
    response.json({
      status: false,
      msg: "password is required",
    });
  }

  let data = await findoneUser(email, password);

  if (data.rows.length > 0) {
    let pass = data.rows[0].password;

    const hashPassword = await bcrypt.compare(password, pass);

    if (hashPassword == true) {
      let data = await varifyUsre(email, pass);

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
          return response
            .cookie("token", token, {
              httpOnly: true,
            })
            .status(200)
            .json({ message: "Logged in successfully 😊 👌" });
        }
      });
    } else {
      response.json({
        status: false,
        msg: "invailid crdentional",
      });
    }
  } else {
    response.json({
      status: false,
      msg: "invailid crdentional",
    });
  }
};

exports.getUserTask = async (request, response) => {
  let token;

  if (request.token) {
    token = request.token;
  }
  const data = jwt.decode(token);

  const userid = data.aud;
  let task = await getUsertask(userid);
  response.status(200).json({
    status: true,
   
    data: task.rows,
    
  });
};
exports.me = async (request, response) => {
  let token;

  if (request.token) {
    token = request.token;
  }
  const data = jwt.decode(token);

  const id = data.aud;
  let task = await findUser(id);
  
  response.status(200).json({
    status: true,
     data: task.rows,
  });
};
exports.getUser = async (request, response) => {
  let task = await getUser();

 // console.log({task, response});
  if(task){
   try{
    console.log(task.rows.length)
  return response.json({ status: 200,count:task.rows.length ,data :task.rows
  });
  } catch(e){
    console.log(e)
  }
   }
};