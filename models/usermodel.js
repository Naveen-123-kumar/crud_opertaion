const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      trim: true,
    },
    age: {
      type: String,
      required: true,
      min: 15,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: validator.isEmail,
      trim: true,
    },
    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const user = mongoose.model("user", userSchema);

module.exports = user;
