const jwt = require("jsonwebtoken");
const User = require("../models/user");

let userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    const authUser = jwt.verify(token, "virat@123");
    if (!authUser) {
      throw Error("invalid token ");
    }

    if (authUser) {
      let users = await User.find({});
      if (!users) {
        throw Error("no user ");
      }

      req.users = users;
    }
    next();
  } catch (err) {
    res.status(400).send("invalid");
  }
};

module.exports = {
  userAuth,
};
