const express = require("express");
const router = express.Router();
const User = require("../models/User");
const protect = require("../middleware/protect");

// @desc   Get all users except me (for chat list)
// @route  GET /api/users
router.get("/", protect, async (req, res) => {
  try {
    // ✅ WhatsApp logic: Jaise hi user list maange, usko ONLINE kar do
    await User.findByIdAndUpdate(req.user._id, {
      isOnline: true,
      lastSeen: new Date()
    });

    const users = await User.find({ _id: { $ne: req.user._id } }).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc   Update my online/offline status (WhatsApp jaisa)
// @route  PUT /api/users/status
router.put("/status", protect, async (req, res) => {
  try {
    const { isOnline } = req.body;
    
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        isOnline: isOnline,
        lastSeen: new Date() // har bar lastSeen update hoga
      },
      { new: true }
    ).select("-password");

    console.log(`${updatedUser.username} -> ${isOnline ? "🟢 ONLINE" : "⚫ OFFLINE"} (lastSeen: ${updatedUser.lastSeen})`);

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc   Get my profile
// @route  GET /api/users/me
router.get("/me", protect, async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;