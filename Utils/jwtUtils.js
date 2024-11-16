const jwt = require("jsonwebtoken");

const generateToken = (userId, role) => {
  const payload = { userId, role };
  const secret = process.env.JWT_SECRET;
  const options = { expiresIn: "2h" }; 

  return jwt.sign(payload, secret, options);
};

const verifyToken = (token) => {
  const secret = process.env.JWT_SECRET;

  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

module.exports = { generateToken, verifyToken };
