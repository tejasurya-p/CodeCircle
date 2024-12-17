const express = require("express");
const { userAuth } = require("../middlewares/userAuth");
const { connectionRequestModel } = require("../models/connectionRequest");
const User = require("../models/user");

const requestUserRouter = express.Router();

requestUserRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await connectionRequestModel
      .find({
        toUserId: loggedInUser._id,
        status: "interested",
      })
      .populate("fromUserId", ["firstName", "lastName"]);

    res.send(connectionRequest);
  } catch (err) {
    res.status(400).json({ message: "Something Went Wrong " + err });
  }
});

requestUserRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await connectionRequestModel
      .find({
        $or: [
          { toUserId: loggedInUser._id, status: "interested" },
          { fromUserId: loggedInUser._id, status: "interested" },
        ],
      })
      .populate("fromUserId", ["firstName", "lastName"])
      .populate("toUserId", ["firstName", "lastName"]);

    const data = connectionRequest.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.send(data);
  } catch (error) {
    res.status(400).json({ message: "Something Went Wrong " + err });
  }
});

requestUserRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const page = req.query.page;
    let limit = req.query.limit;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    const connectionRequest = await connectionRequestModel.find({
      $or: [{ toUserId: loggedInUser._id }, { fromUserId: loggedInUser._id }],
    });

    const blockedUsers = new Set();
    connectionRequest.forEach((element) => {
      blockedUsers.add(element.toUserId.toString());
      blockedUsers.add(element.fromUserId.toString());
      console.log(blockedUsers);
    });
    const feedUsers = await User.find({
      $and: [
        { _id: { $ne: loggedInUser._id } },
        { _id: { $nin: Array.from(blockedUsers) } },
      ],
    })
      .select("firstName lastName")
      .skip(skip)
      .limit(limit);
    res.send(feedUsers);
  } catch (err) {
    res.status(400).json({ message: "Something Went Wrong " + err });
  }
});

module.exports = requestUserRouter;
