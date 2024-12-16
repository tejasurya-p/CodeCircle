const express = require("express");
const dbconnect = require("./database/db");
const User = require("./models/user");
const userRouter = require("./routes/userRoute");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requestRouter");
const requestUserRouter = require("./routes/request");

const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

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

app.use("/", userRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", requestUserRouter);

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
