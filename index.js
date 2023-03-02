const express = require("express");
const echo = require("./functions/echo");
const getName = require("./functions/getName");
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

app.get("/getname", (_, res) => {
  res.send(getName());
});

app.get("/", (_, res) => {
  console.log("yo");
  res.send({ working: "yes bro" });
});

if (process.env.isDev) {
  app.listen(5000, () => console.log("listening on port 5000"));
}

module.exports = app;
