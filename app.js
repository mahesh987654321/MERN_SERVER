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
app.get("/", (req, res) => {
  res.send("Home page app");
});
app.get("/about", middleware, (req, res) => {
  res.send("About page");
});
app.get("/contact", (req, res) => {
  res.send("Contact page");
});
app.get("/signin", (req, res) => {
  res.send("Sign In page");
});
app.get("/signup", (req, res) => {
  res.send("Sign up page");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
