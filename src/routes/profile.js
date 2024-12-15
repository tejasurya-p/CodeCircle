const express = require("express");
const { userAuth } = require("../middlewares/userAuth");

const profileRouter = express.Router();

profileRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const users = req.users;

    res.send(users);
  } catch (err) {
    res.status(404).send("Not Found");
  }
});

module.exports = profileRouter;
