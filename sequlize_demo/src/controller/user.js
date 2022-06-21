const { users } = require("../models");
const { registervalidation } = require("../function/validatetion");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const key = "verysecretkey";




//insert users
exports.insertUser = async (request, response) => {
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
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const userdata = {
    email: email,
    password: hashPassword,
  };

  let validet = registervalidation({ email, password });

  if (validet.error) {
    return response.json({ status: false, error: error.details[0].message });
  } else {
    try {
      let find = await users.findOne({ where: { email } });

      if (find) {
        // throw next(new ApiError(400,'Already exist'));

        response.json({
          status: false,
          msg: "user alredy exist",
        });
      } else {
        const data = await users.create(userdata);

        response.json({
          status: "true",
          email: data.email,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
};


//login user
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

  let data = await users.findOne({ where: { email } });
  console.log(data.password);
  if (data) {
    let pass = data.password;
    const hashPassword = await bcrypt.compare(password, pass);
    if (hashPassword == true) {
      let data = await users.findOne({
        where: { email: email, password: pass },
      });

      const options = {
        expiresIn: "24h",

        audience: String(data.id),
      };
      jwt.sign({ id: data.id }, key, options, (err, token) => {
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

//get all users
exports.getUser = async (request, response) => {
  let data = await users.findAll();
  if(data){
   try{
     return response.json({ status: 200,data :data
  });
  } catch(e){
    console.log(e)
  }
   }
};
