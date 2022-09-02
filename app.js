const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const port = 3000;
dotenv.config({ path: "./config.env" });
const middleware = (req, res, next) => {
  console.log("This is a part of middleware");
  next();
};
// middleware();
const DB = process.env.DATABASE;

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection successful");
  })
  .catch(() => {
    console.log("Connection Unsucessful");
  });

app.get("/", (req, res) => {
  res.send("Home page");
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
