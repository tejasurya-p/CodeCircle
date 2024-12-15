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
      let user = await User.findById({ _id: authUser._id });
      if (!user) {
        throw Error("no user ");
      }

      req.user = user;
    }
    next();
  } catch (err) {
    res.status(400).send("invalid" + err);
  }
};

module.exports = {
  userAuth,
};
