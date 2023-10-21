const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { handleSaveError, runValidateAtUpdate } = require("./hooks.js");

const emailRegexp =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const passRegexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    token: {
      type: String,
    },
    avatar: {
      type: String,
      default: null,
    },
    birthday: {
      type: String,
      default: null,
    },
    skype: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveError);

userSchema.pre("findOneAndUpdate", runValidateAtUpdate);

userSchema.post("findOneAndUpdate", handleSaveError);

const User = mongoose.model("user", userSchema);

module.exports = { User, emailRegexp, passRegexp };
