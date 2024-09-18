// routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const router = express.Router();

// Sign up
router.post('/signup', async (req, res) => {
  
  console.log("Signup called!!!")
  const { email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ email, password });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, { httpOnly: true }).json({ message: 'User created', user });
  } catch (error) {
    res.status(500).json({ message: `error: ${error}` }); 
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, { httpOnly: true }).json({ message: 'Logged in', user });
  } catch (error) {
    res.status(500).json({ message: `error: ${error}` });
  }
});

// Logout
router.post('/logout', (req, res) => {
  res.clearCookie('token').json({ message: 'Logged out' });
});

// Check if user is authenticated
router.get('/me', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.json({ isAuthenticated: false });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.json({ isAuthenticated: false });
    res.json({ isAuthenticated: true, userId: decoded.id });
  });
});

module.exports = router;
