const express = require("express");
const User = require("./router/user");
const Task = require("./router/task");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const bodyParser = require("body-parser");
//const sweggerDoc= require("./swegger.json")
const { options } = require("joi");
const cookieParser = require("cookie-parser");
const { getUser,insertuser} = require("./controller/user");
const httpStatus = require('http-status');
const  ApiError  = require("./function/handalerror");

const app = express();
const port =  8080;

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let {
    statusCode,
    message
  } = err;
  if (!err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;
  const response = {
    error: {
      code: statusCode,
      type: httpStatus[statusCode],
      message,
      ...({
        //stack: err.stack
      }),
    },
    success: false
  };
  res.status(statusCode).send(response);
};

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());

const option = {
  swaggerDefinition: {
    openapi: "3.0.1", // YOU NEED THIS
    info: {
      title: "Node Js  Api",
      version: "1.0.0",
      description: "a simple curd api",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
    basePath: "/",
    // components: {
    //   securitySchemes: {
    //     bearerAuth: {
    //       type: "http",
    //       scheme: "bearer",
    //       bearerFormat: "JWT",
    //     },
    //   },
    // },
    // security: [
    //   {
    //     bearerAuth: [],
    //   },
    // ],
  },
  apis: [`${__dirname}/router/*.js`]
}
const specs = swaggerJsdoc(option);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.get("/", (request, response) => {
  return response.json({ info: "Node.js, Express, and Postgres API" });
});
app.use(User);
app.use(Task);

app.listen(port,
   () => {
  console.log(`App running on port ${port}.`);
});


// handle error
app.use(errorHandler);

module.exports = app;
