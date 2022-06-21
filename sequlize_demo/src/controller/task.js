const jwt = require("jsonwebtoken");
const { task } = require("../models");
const { paginate } = require("../function/querys");

//insert task
exports.insertTask = async (request, response) => {
  const { name, dec, user_id } = request.body;

  if (!name) {
    response.json({
      status: false,
      msg: "name is required",
    });
  } else {
    let token;

    if (request.token) {
      token = request.token;
    }
    const data = jwt.decode(token);

    const iddd = data.id;
    const taskdata = {
      name: name,
      dec: dec,
      user_id: iddd,
    };
    let results = await task.create(taskdata);
    response.json({
      status: "true",
      data: results,
    });
  }
};

//update task
exports.updatetask = async (request, response) => {
  let token;

  if (request.token) {
    token = request.token;
  }
  const data = jwt.decode(token);
  const iddd = data.aud;

  const id = request.params.id;
  let find = await task.findOne({ where: { id } });

  let tname = find.name;
  let tdec = find.dec;
  let usre = find.user_id;

  if (iddd != usre) {
    return response.status(401).json({
      status: false,
      msg: " Unauthorized",
    });
  }
  let { name, dec } = request.body;
  if (!name) {
    name = tname;
  }
  if (!dec) {
    dec = tdec;
  }

  let results = await task.update(
    { name: name, dec: dec, user_id: usre },
    { returning: true, where: { id } }
  );

  return response.status(200).json({
    status: true,
    data: results,
  });
};
//get task with pagination 
exports.getTasks = async (request, response) => {
  const {limit,sort,page} = request.query;
  const skipValue = limit * (page - 1);
  let results = await paginate(limit, skipValue, sort, task);
  response.json({
    status: true,
    data: results,
  });
};
//delete task
exports.deleteTask = async (request, response) => {
  let id = request.params.id;
  let data = await task.destroy({ where: { id: id }, returning: true });

  response.status(200).json({
    status: true,
    data: data,
    msg: `${data} Record Deleted`,
  });
};
