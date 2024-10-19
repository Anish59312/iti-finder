const UserInfo = require('../models/userInfo.js'); // Update with the correct path to your model file
const express = require('express');
const router = express.Router();
const talukas = require('../Data/locations.js')
// Create a new user info entry
router.post('/create', async (req, res) => {
  try {
    const { age, contactNo, taluka, qualification } = req.body;
    console.log('user info create called!!')

    if (!talukas.includes(taluka)) {
      console.log("invalid taluka")
      console.log(location)
      res.status(500).json({
        message: 'Enter valid taluka',
        error: error.message
      });
    }

    const userInfo = new UserInfo({
      user: req.user.id, // Assuming the token payload contains the user ID as `id`
      age,
      contactNo,
      location: taluka,  // Ensure `location` object is properly structured
      qualification
    });
    await userInfo.save();
    res.status(201).json({
      message: 'User info created successfully',
    });
    console.log('User info created successfully');
  } catch (error) {
    console.error('Error creating user info:', error);
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message
    });
  }
});

// Update user info by ID
router.put('/update/:id', async (req, res) => {
  try {
    const { age, contactNo, location, qualification } = req.body;
    const userInfoId = req.params.id;

    // Find user info by ID and update it
    const updatedUserInfo = await UserInfo.findByIdAndUpdate(
      userInfoId,
      { age, contactNo, location, qualification },
      { new: true, runValidators: true } // Options to return the updated document
    );

    if (!updatedUserInfo) {
      return res.status(404).json({ message: 'User info not found' });
    }

    res.status(200).json({
      message: 'User info updated successfully',
      userInfo: updatedUserInfo
    });
  } catch (error) {
    console.error('Error updating user info:', error);
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message
    });
  }
});

// Delete user info by ID
router.delete('/delete/:id', async (req, res) => {
  try {
    const userInfoId = req.params.id;

    // Find user info by ID and delete it
    const deletedUserInfo = await UserInfo.findByIdAndDelete(userInfoId);

    if (!deletedUserInfo) {
      return res.status(404).json({ message: 'User info not found' });
    }

    res.status(200).json({
      message: 'User info deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting user info:', error);
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message
    });
  }
});

module.exports = router;
