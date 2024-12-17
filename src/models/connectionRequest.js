const { Schema, default: mongoose } = require("mongoose");

const connectionRequestSchema = new Schema({
  fromUserId: {
    type: String,
    ref: "User",
    required: true,
  },
  toUserId: {
    type: String,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: {
      values: ["interested", "ignored", "accepted", "rejected"],
      message: "Not in list ",
    },
  },
});

const connectionRequestModel = new mongoose.model(
  "connectionrequest",
  connectionRequestSchema
);

module.exports = { connectionRequestModel };
