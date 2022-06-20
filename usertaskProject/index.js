const express = require("express");
const User = require("./router/user");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const bodyParser = require("body-parser");
//const sweggerDoc= require("./swegger.json")
const { options } = require("joi");
const app = express();
const port = 6001;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// const option = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Node Js  Api",
//       version: "^1.0.0",
//       description: "a simple curd api",
//     },
//     servers: [
//       {
//         url: "http://localhost:6001",
//       },
//     ],
//   },
//   components: {
//     securitySchemes: {
//       Bearer: {
//         type: "http",
//         scheme: "bearer",
//         description: "Enter JWT Bearer token",
//         bearerFormat: "JWT",
//       },
//     },
//   },
//   security: [
//     {
//       Bearer: [],
//     },
//   ],

//   apis: [`${__dirname}/router/user.js`],
// };

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
        url: "http://localhost:6001",
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
  apis: [`${__dirname}/router/user.js`],
};
const specs = swaggerJsdoc(option);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.get("/", (request, response) => {
  return response.json({ info: "Node.js, Express, and Postgres API" });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
app.use(User);
