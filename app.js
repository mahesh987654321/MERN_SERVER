const express = require("express");
const { default: mongoose } = require("mongoose");

const app = express();
const port = 3000;
const middleware = (req, res, next) => {
  console.log("This is a part of middleware");
  next();
};
// middleware();
const DB =
  "mongodb+srv://mern_project:5ns6m14NIEZo9YjM@cluster0.eqxbe.mongodb.net/mern_project?retryWrites=true&w=majority";
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
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
