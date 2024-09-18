const UserInfo = require('../models/userInfo.js'); // Update with the correct path to your model file
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const secretKey = 'your_secret_key'; // Replace with your actual secret key

// Create a new user info entry
router.post('/create', async (req, res) => {
  try {
    const { age, contactNo, location, qualification } = req.body;

    // Get the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (token == null) return res.status(401).json({ message: 'No token provided' });

    // Verify and decode the JWT token
    const user = jwt.verify(token, secretKey);
    
    // Create a new UserInfo instance
    const userInfo = new UserInfo({
      user: user.id, // Assuming the token payload contains the user ID as `id`
      age,
      contactNo,
      location,
      qualification
    });

    // Save the UserInfo instance to the database
    await userInfo.save();

    // Respond with the created document
    res.status(201).json({
      message: 'User info created successfully',
      data: userInfo
    });
  } catch (error) {
    console.error('Error creating user info:', error);
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message
    });
  }
});

module.exports = router;
