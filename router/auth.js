const express = require("express");
const router = express.Router();
require("../db/conn");
const User = require("../model/userSchema");
router.get("/", (req, res) => {
  res.send("Home page server");
});
router.post("/register", (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "Please fill the field properly" });
  }
  User.findOne({ email: email })
    .then((userExists) => {
      if (userExists) {
        return res
          .status(409)
          .json({ error: "Ohh dear user is already exists" });
      }
      const user = new User({ name, email, phone, work, password, cpassword });
      user
        .save()
        .then(() => {
          res.status(201).json({ message: "User is created" });
        })
        .catch((err) => {
          res.status(500).json({ err: "Failed to register try again" });
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
