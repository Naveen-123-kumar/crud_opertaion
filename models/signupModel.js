const mongoose = require("mongoose");
const validator = require("validator");

const signupSchema = new mongoose.Schema(
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
    mobile: {
      type: Number,
      min: 10,
      unique: true,
      required: true,
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
      min: 2,
    },
    gender: {
      type: String,
      required: true,
      trim: true,
      min: 2,
    },
    city: {
      type: String,
      required: true,
      trim: true,
      min: 2,
    },
    state: {
      type: String,
      required: true,
      trim: true,
      min: 2,
    },
    country: {
      type: String,
      required: true,
      trim: true,
      min: 2,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      min: 4,
    },
  },
  {
    timestamps: true,
  }
);

const signup_list = mongoose.model("signup_list", signupSchema);

module.exports = signup_list;
