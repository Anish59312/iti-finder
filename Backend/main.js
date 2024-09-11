
// server.js
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const tradeRoutes = require('./routes/trades');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

app.use(cookieParser());

app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true
}));

const uri = process.env.MONGO_URI;
// MongoDB connection
// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log("Connected to MongoDB");
// }).catch((error) => {
//   console.log("Error connecting to MongoDB:", error);
// });

//connection code written by anish
mongoose.connect(uri);
console.log("connected to atlas mongoDB");

// Routes
app.use('/auth', authRoutes);
app.use('/trade', tradeRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
