const bcrypt = require("bcryptjs");
const User = require("../Models/User");
const { generateToken } = require("../Utils/jwtUtils");


const registerUser = async (req, res) => {
  const { fullName, mobileNumber, email, password, dateOfBirth, role } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { mobileNumber }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      mobileNumber,
      email,
      password: hashedPassword,
      dateOfBirth,
      role: role || "user", 
    });
    await newUser.save();
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const loginUser = async (req, res) => {
    const { mobileNumber, password } = req.body;
  
    try {
      const user = await User.findOne({ mobileNumber });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const token = generateToken(user._id, user.role);
      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          fullName: user.fullName,
          mobileNumber: user.mobileNumber,
          role: user.role,
        },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

module.exports = { registerUser, loginUser };
