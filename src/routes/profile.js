const express = require("express");
const { userAuth } = require("../middlewares/userAuth");
const { validateEdit } = require("../utils/validateEdit");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(404).send("Not Found");
  }
});

profileRouter.get("/profile/edit", userAuth, async (req, res) => {
  try {
    validateEdit(req);
    let user = req.user;
    let edit = req.body;
    Object.keys(edit).forEach((key) => (user[key] = edit[key]));
    user.save();

    res.send("Edited succesfully");
  } catch (err) {
    res.status(400).send("Error" + err);
  }
});

module.exports = profileRouter;
