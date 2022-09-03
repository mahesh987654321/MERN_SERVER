const express = require("express");

const dotenv = require("dotenv");
require("./db/conn");

const app = express();
const port = 5000;
app.use(express.json());
const User = require("./model/userSchema");
dotenv.config({ path: "./config.env" });
const middleware = (req, res, next) => {
  console.log("This is a part of middleware");
  next();
};
// middleware();
app.use(require("./router/auth"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
