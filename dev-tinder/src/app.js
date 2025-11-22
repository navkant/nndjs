const express = require("express");

const app = express();
const PORT = 3000;

app.use("/api", (req, res, next) => {
  console.log("middleware called");
  next();
});

app.get("/api/home", (req, res, next) => {
  console.log("home controller");
  throw Error("this is deprecated");
  res.send("home controller");
});

app.use("/", (err, req, res, next) => {
  if (err) {
    console.log(err);
    res.status(400).send("something went wrong");
  }
});

app.listen(PORT, () => {
  console.log(`express server listening at ${PORT}`);
});
