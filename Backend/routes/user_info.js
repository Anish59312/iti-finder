const UserInfo = require('../models/userInfo.js'); // Update with the correct path to your model file
const express = require('express');
const router = express.Router();

// Create a new user info entry
router.post('/create', async (req, res) => {
  try {
    const { user, age, contactNo, location: { district, city }, qualification } = req.body;

    const userInfo = new UserInfo({
      user: req.user.id, // Assuming the token payload contains the user ID as `id`
      age,
      contactNo,
      location: { district, city },  // Ensure `location` object is properly structured
      qualification
    });
    await userInfo.save();
    res.status(201).json({
      message: 'User info created successfully',
    });
    console.log('User info created successfully')
  } catch (error) {
    console.error('Error creating user info:', error);
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message
    });
  }
});


module.exports = router;
