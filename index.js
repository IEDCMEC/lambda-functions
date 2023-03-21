const express = require("express");
const fs = require("fs");
const {
  echo,
  getTime,
  getName,
  getTodo,
  getExplara,
  getCount,
  generateCertificate,
} = require("./functions");

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

app.get("/gettodos", async (_, res) => {
  const data = await getTodo(true);
  res.send(data);
});

app.get("/gettodo", async (_, res) => {
  const data = await getTodo();
  res.send(data);
});

app.get("/explara", async (_, res) => {
  const data = await getExplara();
  console.log({ data });
  res.send(data);
});

app.get("/count", async (_, res) => {
  const data = await getCount();
  res.send(data);
});

app.get("/certificate", async (_, res) => {
  const data = await generateCertificate();
  res.send(data);
});

app.get("/registrations", async (_, res) => {
  const filePath = __dirname + "/html/totalRegistration.html";
  res.sendFile(filePath);
});

app.get("/", (_, res) => {
  console.log("yo");
  res.send({ working: "yes bro", status: "Alive and kicking" });
});

if (process.env.isDev) {
  app.listen(5000, () => console.log("listening on port 5000"));
}

module.exports = app;

// getWorkshopCount();
