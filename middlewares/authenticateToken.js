const jwt = require("jsonwebtoken");

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// Middleware to authenticate the token
const authenticate_Token = (req, res, next) => {
  // Check if the Authorization header is present
  const token = req.header("Authorization")?.split(" ")[1]; // Get token from header

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Verify the token
    req.user = decoded; // Attach decoded token payload to req.user
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(403).json({ msg: "Token is not valid" });
  }
};

module.exports = authenticate_Token;
