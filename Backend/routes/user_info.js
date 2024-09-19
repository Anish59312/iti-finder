const UserInfo = require('../models/userInfo.js'); // Update with the correct path to your model file
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const secretKey = 'your_secret_key'; // Replace with your actual secret key

// Create a new user info entry
router.post('/create', async (req, res) => {
  try {
    const { user, age, contactNo, location, qualification } = req.body;

    // console.log(req)
    console.log(req.user)
    console.log(user, age, contactNo, location, qualification)
    // Get the token from the Authorization header
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>


    // console.log("printing auth ", req.cookies)


  //   const token = req.cookies.token; // Access the token from cookies

  // if (!token) {
  //   return res.status(401).json({ message: 'Access denied. No token provided.' });
  // }

  // try {
  //   // Verify token
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //   req.user = decoded; // Attach decoded data (e.g., user ID) to req.user
  //   next();
  // } catch (error) {
  //   res.status(400).json({ message: 'Invalid token.' });
  // }

    // if (token == null) 
    //   res.status(401).json({ message: 'No token provided' });

    // // Verify and decode the JWT token
    // const user_ = jwt.verify(token, secretKey);
    
    // console.log("hello")
    // console.log(user_,token)

    // // Create a new UserInfo instance
    // const userInfo = new UserInfo({
    //   user: user.id, // Assuming the token payload contains the user ID as `id`
    //   age,
    //   contactNo,
    //   location,
    //   qualification
    // });

    // // Save the UserInfo instance to the database
    // await userInfo.save();

    // // Respond with the created document
    // res.status(201).json({
    //   message: 'User info created successfully',
    //   data: userInfo
    // });
  } catch (error) {
    console.error('Error creating user info:', error);
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message
    });
  }
});

module.exports = router;
