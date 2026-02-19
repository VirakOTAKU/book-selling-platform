import express from 'express';
import { Database_Helper } from '../database.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get user profile
router.get('/profile', authenticate, (req, res) => {
  try {
    const user = Database_Helper.getUserById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Don't send password
    delete user.password;
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user profile
router.put('/profile', authenticate, async (req, res) => {
  try {
    const { firstName, lastName, phone, bio } = req.body;
    
    await Database_Helper.updateUser(req.user.userId, { firstName, lastName, phone, bio });

    // Return updated user
    const user = Database_Helper.getUserById(req.user.userId);
    delete user.password;
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
