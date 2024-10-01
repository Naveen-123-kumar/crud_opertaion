const bcrypt = require("bcrypt");
const signup_list = require("../models/signupModel");

const handleSignup = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    jobTitle,
    gender,
    password,
    mobile,
    city,
    state,
    country,
  } = req.body;

  // Ensure all required fields are present
  if (
    firstName &&
    lastName &&
    email &&
    jobTitle &&
    password && // Ensure password is part of the request body
    mobile &&
    city &&
    state &&
    country
  ) {
    try {
      // Check if the user already exists by their email
      const existingUser = await signup_list.findOne({ email: email });

      if (existingUser) {
        return res
          .status(400)
          .json({ msg: "User already exists with this email" });
      }

      // Hash the password using bcrypt
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user
      const result = await signup_list.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        jobTitle: jobTitle,
        gender: gender,
        password: hashedPassword, // Store the hashed password
        mobile: mobile,
        city: city,
        state: state,
        country: country,
      });

      // Return a success response
      return res.status(201).json({
        msg: "Signup has been done successfully",
        signup_list: result,
      });
    } catch (err) {
      console.error("Error creating user:", err);
      return res.status(500).json({ msg: "Error creating user", error: err });
    }
  }

  // If any field is missing
  return res.status(400).json({ msg: "All fields are required!" });
};

const handleGetSignup = async (req, res) => {
  try {
    // Fetch all users from the signup_list collection
    const users = await signup_list.find({});

    // If no users found, return a 404 status
    if (!users || users.length === 0) {
      return res.status(404).json({ msg: "No users found" });
    }

    // Return the list of users
    return res.status(200).json({ msg: "Users fetched successfully", users });
  } catch (err) {
    // Handle errors
    console.error("Error fetching users:", err);
    return res.status(500).json({ msg: "Error fetching users", error: err });
  }
};

const handleGetSignup_byid = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user by ID
    const user = await signup_list.findById(id);

    // Check if user exists
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Return user data
    return res.status(200).json({ user });
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    return res.status(500).json({ msg: "Error fetching user", error: err });
  }
};

module.exports = { handleSignup, handleGetSignup, handleGetSignup_byid };
