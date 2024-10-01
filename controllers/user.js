const user = require("../models/usermodel");


const handleGetAllUers = async (req, res) => {
  try {
    const users = await user.find({});
    if (users.length === 0) {
      return res.status(404).json({ msg: "No users found" });
    }
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ msg: "Error fetching users", error: err });
  }
};

const handleSetUser = async (req, res) => {
  const body = req.body;
  // Proper validation to check if all required fields are present
  if (
    body.firstName &&
    body.lastName &&
    body.age &&
    body.email &&
    body.jobTitle &&
    body.gender
  ) {
    try {
      const result = await user.create({
        firstName: body.firstName,
        lastName: body.lastName,
        age: body.age,
        email: body.email,
        jobTitle: body.jobTitle,
        gender: body.gender,
      });
      console.log("result", result);
      return res
        .status(201)
        .json({ msg: "User Created successfully", user: result });
    } catch (err) {
      console.error("Error creating user:", err);
      return res.status(500).json({ msg: "Error creating user", error: err });
    }
  }

  return res.status(400).json({ msg: "All fields are required!" });
};

const handleUpdateUser = async (req, res) => {
  const { firstName, lastName, age, jobTitle, gender } = req.body;

  try {
    // Update the user fields excluding the email
    const updatedUser = await user.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, age, jobTitle, gender }, // Email is not updated here
      {
        new: true, // Return the updated document
        runValidators: true, // Run validation based on schema
      }
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ msg: "User updated successfully", updatedUser });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ msg: "Error updating user", error: err });
  }
};

const handleGetUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const foundUser = await user.findById(userId);

    if (!foundUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(foundUser);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ msg: "Error fetching user", error: err });
  }
};

const handleDeleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await user.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ msg: "User deleted successfully", deletedUser });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ msg: "Error deleting user", error: err });
  }
};
module.exports = {
  handleGetAllUers,
  handleSetUser,
  handleUpdateUser,
  handleGetUserById,
  handleDeleteUserById,
};
