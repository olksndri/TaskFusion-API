const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
  },
  { versionKey: false }
);

const User = mongoose.model("user", user);

module.exports = { User };
