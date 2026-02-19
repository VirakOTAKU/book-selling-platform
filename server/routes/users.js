const express = require('express');
const { db, Database_Helper } = require('../database');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/profile', authenticate, (req, res) => {
  try {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    const user = stmt.get(req.user.userId);
    
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
router.put('/profile', authenticate, (req, res) => {
  try {
    const { firstName, lastName, phone, bio } = req.body;
    
    const updateStmt = db.prepare(
      'UPDATE users SET firstName = ?, lastName = ?, phone = ?, bio = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?'
    );
    updateStmt.run(firstName, lastName, phone, bio, req.user.userId);

    // Return updated user
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    const user = stmt.get(req.user.userId);
    delete user.password;
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
