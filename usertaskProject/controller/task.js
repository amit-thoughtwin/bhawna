const {
    instertask,
    updateTask,
    findoneTask,
    deleteTask,
    getTask,
    pagination,
   
    
  } = require("../model/task");

  const jwt = require("jsonwebtoken");
  const { ApiError,catchAsync}  = require("../function/handalerror");
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
      const iddd = data.aud;
      let results = await instertask(name, dec, iddd);
      response.json({
        status: "true",
        data: results.rows,
      });
    }
  };
  
  exports.updatetask = async (request, response) => {
    let token;
  
    if (request.token) {
      token = request.token;
    }
    const data = jwt.decode(token);
    const iddd = data.aud;
  
    const id = request.params.id;
    let task = await findoneTask(id);
    let tname = task.rows[0].name;
    let tdec = task.rows[0].dec;
    let usre = task.rows[0].user_id;
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
  
    let results = await updateTask(name, dec, iddd, id);
  
    return response.status(200).json({
      status: true,
      data: results.rows,
    });
  };
  exports.getTasks = async (request, response) => {
    const pageno = request.query.page;
    const name = request.query.name;
    const short = request.query.short;
    const pageSize = pageno;
  
    const limitValue = request.query.limit || 5;
    const skipValue = limitValue * (pageSize - 1);
  
    let results = await pagination(limitValue, skipValue, short);
  
    response.json({
      status: true,
      count :results.rows.length ,
      data: results.rows,
    });
  };
  
  exports.deleteTask = catchAsync(async (request, response) => {
    let id = request.params.id;
    let task = await deleteTask(id);
    console.log(task.rows.length)
    if(task.rows.length==0){
throw new ApiError(400, "record not found"); 
    }
    else{
    response.status(200).json({
      status: true,
      msg: "1 record Deleted",
    });
  }
  });

  exports.getTask = async (request, response) => {
    let id = request.params.id;
    let task = await getTask(id);
    response.status(200).json({
      status: true,
     
     data:task.rows
    });
  };