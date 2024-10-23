
// server.js
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
// const cors = require('cors');
const authRoutes = require('./routes/auth');
const tradeRoutes = require('./routes/trades');
const itiRoutes = require('./routes/iti.js');
const user_info = require('./routes/user_info.js');
const user_intrest = require('./routes/user_interest.js')
const iti_trade_Routes = require('./routes/iti_trades.js')
const InterestTrade = require('./routes/IntrestTrade.js')
const jwt = require('jsonwebtoken');


require('dotenv').config();

const app = express();
const cors = require('cors');


app.use(cors({ origin: 'http://localhost:3000', credentials: true }));


// Middleware
app.use(express.json());
``
app.use(cookieParser(process.env.JWT_SECRET));

const authMiddleware = (req, res, next) => {
  // Check token in cookies or Authorization header
  const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  // console.log(token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded data (e.g., user ID) to req.user
    // console.log("Authorized", req.user);
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired. Please log in again.' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(400).json({ message: 'Invalid token. Access denied.' });
    } else {
      console.error("Auth middleware error:", error); // Log the actual error for debugging
      return res.status(500).json({ message: 'Internal server error in auth middleware.' });
    }
  }

};


app.use(cors({
  origin: ['http://localhost:5000'],
  credentials: true
}));

const uri = process.env.MONGO_URI;

//connection code written by anish
mongoose.connect(uri);
console.log("connected to atlas mongoDB");

// Routes
app.use('/auth', authRoutes);
app.use(authMiddleware);
app.use('/user_info', user_info);
app.use('/user_intrest', user_intrest)
app.use('/trade', tradeRoutes);
app.use('/iti', itiRoutes);
app.use('/iti_trade', iti_trade_Routes)
app.use('/InterestTrade',InterestTrade)

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
