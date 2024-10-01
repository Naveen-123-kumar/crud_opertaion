const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const bodyparser = require("body-parser");
const { connectMongoDb } = require("./connection");
const router = require("./routes/user");

// Load environment variables
dotenv.config({ path: path.join(__dirname, ".", ".env") });
const port = process.env.PORT || 4002;

// Body parser middleware
app.use(bodyparser.json());

// Connect to MongoDB
connectMongoDb("mongodb://127.0.0.1:27017/userlist");

// Use routes
app.use("/", router);

// Start the server
app.listen(port, () => console.log(`Server started at port ${port}`));
