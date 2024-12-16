const express = require("express");
const { userAuth } = require("../middlewares/userAuth");
const { connectionRequestModel } = require("../models/connectionRequest");

const requestRouter = express.Router();

requestRouter.get(
  "/request/send/:status/:user_Id",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.user_Id;
      const status = req.params.status;

      let allow = ["ignored", "interested"];
      if (!allow.includes(status)) {
        throw Error("Invalid Status");
      }
      if (toUserId == fromUserId) {
        throw Error("Invalid User Id");
      }
      const duplicateReq = await connectionRequestModel.find({
        $or: [
          { toUserId, fromUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      console.log(duplicateReq);
      if (duplicateReq.length > 0) {
        throw Error("Request is Invalid");
      }
      const connection = new connectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });
      connection.save();
      res.send(connection);
    } catch (err) {
      res.status(400).json({ message: "Something Went Wrong " + err });
    }
  }
);

requestRouter.get(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      let user = req.user;
      let { status, requestId } = req.params;
      let allow = ["accepted", "rejected"];
      console.log(status);
      if (!allow.includes(status)) {
        res.status(400).json({ message: "Wrong status " + err });
      }
      const connectionRequest = await connectionRequestModel.findById({
        _id: requestId,
        toUserId: user,
        status: "interested",
      });

      connectionRequest.status = status;
      connectionRequest.save();
      res.send(connectionRequest);
    } catch (err) {
      res.status(400).json({ message: "Something Went Wrong " + err });
    }
  }
);

module.exports = requestRouter;
