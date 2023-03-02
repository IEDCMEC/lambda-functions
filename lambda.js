"use strict";
``;
const app = require("./index");
const serverless = require("serverless-http");
// const awsServerlessExpress = require("aws-serverless-express");
// const server = awsServerlessExpress.createServer(app);

// exports.handler = (event, context) => {
//   awsServerlessExpress.proxy(server, event, context);
// };

module.exports.handler = serverless(app);
