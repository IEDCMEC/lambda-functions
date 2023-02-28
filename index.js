const express = require("express");

const app = express();

app.get("/", (req, res) => {
  console.log("yo");
  res.send({ working: "yes bro" });
});

app.listen(5000, () => console.log("listening on port 5000"));
module.exports = app;
