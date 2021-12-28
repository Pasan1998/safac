const express = require("express");
const router = express("Router");
const User = require("../models/userModells");
const bcrypt = require("bcrypt");

router.post("/auth/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10); // creating salt
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //CREATE NEW user
    const user = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    consolo.log(err);
  }
});

//login

router.post("/auth/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user &&
      res.status(404).json({
        message: "user not found",
      });
    const validpassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validpassword &&
      res.status(400).json({
        message: "Password incorrect",
      });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
