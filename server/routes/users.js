const express = require('express');
const User = require('../models/User');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user profile
router.put('/profile', authenticate, async (req, res) => {
  try {
    const { firstName, lastName, phone, address, bio, profilePicture } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      {
        firstName,
        lastName,
        phone,
        address,
        bio,
        profilePicture,
        updatedAt: Date.now()
      },
      { new: true }
    );

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
