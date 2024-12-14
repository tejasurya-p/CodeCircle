const express = require("express");
const dbconnect = require("./database/db");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validate");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());

const PORT = 3000;

dbconnect()
  .then(() => {
    console.log("connected successfully");
    app.listen(PORT, () => {
      console.log(`Running on PORT:${PORT}`);
    });
  })
  .catch(() => {
    console.log("not connected");
  });

app.post("/signup", async (req, res) => {
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

app.get("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.find({ email: email });
    if (findUser.length === 0) {
      throw new Error("please enter correctr email");
    }
    let auth = await bcrypt.compare(password, findUser[0].password);
    if (auth) {
      res.send("Login Avipoyav ra chinna");
    }
  } catch (err) {
    res.status(400).send("Bad Request" + err);
  }
});

app.get("/feed", async (req, res) => {
  try {
    let users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(404).send("Not Found");
  }
});

app.delete("/delete", async (req, res) => {
  try {
    const deleteUser = await User.deleteOne({ firstName: req.body.firstName });
    res.send(deleteUser);
  } catch (err) {
    res.status(400).send("Un Successfull");
  }
});

app.patch("/update", async (req, res) => {
  try {
    const updateUser = await User.updateOne(
      { firstName: req.body.firstName },
      { firstName: "pk Pawan" }
    );
    res.send(updateUser);
  } catch (err) {
    console.log(err);
    res.send("sorryy mann");
  }
});
