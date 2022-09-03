const express = require("express");
const router = express.Router();
require("../db/conn");
const User = require("../model/userSchema");
router.get("/", (req, res) => {
  res.send("Home page server");
});
router.post("/register", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "Please fill the field properly" });
  }
  try {
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res.status(409).json({ error: "Ohh dear user is already exists" });
    }
    const user = new User({
      name,
      email,
      phone,
      work,
      password,
      cpassword,
    });
    const userRegister = await user.save();

    if (userRegister) {
      res.status(201).json({ message: "User is created" });
    } else {
      res.status(500).json({ err: "Failed to register try again" });
    }
  } catch (error) {
    console.log(error);
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please fill the field properly" });
  }
  try {
    const userExists = await User.findOne({ email: email });
    if (!userExists) {
      res.status(500).json({ error: "Email is not found" });
    } else {
      return res.status(201).json({ message: "Login successful" });
    }
    const user = new User({ email, password });
    const userLogin = await user.save();
    if (userLogin) {
      res.status(201).json({ message: "User is created" });
    } else {
      res.status(500).json({ err: "Failed to register try again" });
    }
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
