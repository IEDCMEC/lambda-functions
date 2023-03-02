const express = require("express");
const echo = require("./functions/echo");
const getTime = require("./functions/getTime");

const app = express();

app.get("/time", (_, res) => {
  const t = getTime();
  res.send(t);
});

app.get("/ping", (_, res) => {
  res.send("pong");
});

app.get("/echo", (req, res) => {
  const { query } = req.query;
  const data = echo(query);
  res.send(data);
});

app.get("/", (_, res) => {
  console.log("yo");
  res.send({ working: "yes bro" });
});

// console.log(process.env);
// console.log(process.env.isdev);
if (process.env.isdev) {
  app.listen(5000, () => console.log("listening on port 5000"));
}

module.exports = app;
