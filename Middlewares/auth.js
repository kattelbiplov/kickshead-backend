const { verifyToken } = require("../Utils/jwtUtils");

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];  

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;  
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = authenticateToken;
