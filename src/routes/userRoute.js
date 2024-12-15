const express = require("express");
const { validateSignUpData } = require("../utils/validate");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const userRoute = express.Router();

userRoute.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, password, email } = req.body;
    validateSignUpData(req);
    let passwordHash = await bcrypt.hash(password, 10);

    let user = new User({
      firstName,
      lastName,
      password: passwordHash,
      email,
    });
    await user.save();
    res.send("Success");
  } catch (err) {
    res.status(403).send("Forbidden:" + err);
  }
});

userRoute.get("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email: email });
    const token = await findUser.getJWT();

    if (!token) {
      throw new Error("Invalid");
    } else {
      res.cookie("token", token);
    }

    if (!findUser) {
      throw new Error("please enter correctr email");
    }
    let auth = await bcrypt.compare(password, findUser.password);
    if (auth) {
      res.send("Login Avipoyav ra chinna");
    }
  } catch (err) {
    res.status(400).send("Bad Request" + err);
  }
});

module.exports = userRoute;
