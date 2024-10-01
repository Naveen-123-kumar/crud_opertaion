const express = require("express");
const router = express.Router();
const signup_list = require("../models/signupModel");
const authenticate_Token = require("../middlewares/authenticateToken");
const {
  handleGetAllUers,
  handleSetUser,
  handleUpdateUser,
  handleGetUserById,
  handleDeleteUserById,
} = require("../controllers/user");

const {
  handleSignup,
  handleGetSignup,
  handleGetSignup_byid,
} = require("../controllers/signup");

const { handleSign_in } = require("../controllers/signin");

//sign up
router.post("/api/signup", handleSignup);

//sign in
router.post("/api/signin", handleSign_in);

// GET route to fetch all users
router.get("/api/signup", handleGetSignup);

router.get("/api/signup/:id", handleGetSignup_byid);

//Route for set users
router.post("/setuser", authenticate_Token, handleSetUser);

// Route to get all users
router.get("/getusers", authenticate_Token, handleGetAllUers);

// Route to update a user by ID
router.put("/updateuser/:id", authenticate_Token, handleUpdateUser);

// Route to get a user by ID
router.get("/getuser/:id", authenticate_Token, handleGetUserById);

// Route to delete a user by ID
router.delete("/deleteuser/:id", authenticate_Token, handleDeleteUserById);

module.exports = router;
