const express = require('express');
const router = express.Router();
const User = require('./User'); // Import the User model

// Define routes using the router object
router.post('/check-existing', async (req, res) => {
  const { email, username } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      return res.json({ taken: true });
    }

    return res.json({ taken: false });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Define other user-related routes if needed
// For example, registration, login, profile update, etc.

// Export the router to make it available to other parts of your application
module.exports = router;
