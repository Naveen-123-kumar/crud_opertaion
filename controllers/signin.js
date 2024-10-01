const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const signup_list = require("../models/signupModel"); // Path to your signup model

// JWT Secret Key (store this in your .env file for security)
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// Route to sign in a user with email and password
const handleSign_in = async (req, res) => {
  const { email, password } = req.body;

  // Ensure email and password are provided
  if (!email || !password) {
    return res.status(400).json({ msg: "Email and password are required!" });
  }

  try {
    // Find the user by email
    const user = await signup_list.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    // If passwords do not match, return an error
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email }, // Payload (you can add more data to the payload if needed)
      JWT_SECRET, // Secret key
      { expiresIn: "3h" } // Token expiration time
    );

    // If the credentials are valid, return success response with token
    return res.status(200).json({
      msg: "Sign in successful",
      token, // Return the token in the response
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        jobTitle: user.jobTitle,
        gender: user.gender,
        city: user.city,
        state: user.state,
        country: user.country,
      },
    });
  } catch (err) {
    console.error("Error during sign in:", err);
    return res.status(500).json({ msg: "Server error", error: err });
  }
};

module.exports = { handleSign_in };
