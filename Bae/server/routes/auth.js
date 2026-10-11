const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { registerUser, loginUser, logoutUser } = require("../controllers/authController");

// Simple protect middleware
const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) return res.status(401).json({ message: "No token" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token failed" });
  }
};

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", protect, logoutUser);

// WhatsApp jaisa Online/Offline - YE UPAR HONA CHAHIYE EXPORT SE
router.put("/status", protect, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { isOnline: req.body.isOnline, lastSeen: new Date() },
      { new: true }
    );
    console.log(user.username + " is now " + (user.isOnline? "ONLINE" : "OFFLINE"));
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router; // <-- hamesha sabse END me