const mongoose = require('mongoose');

// Define the valid locations
const locations = require('../Data/locations.js')

// Create the info schema
const infoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // This refers to the 'User' model
    required: true,
  },
  age: {
    type: Number,
    required: true
  },
  contactNo: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    enum: locations,
    required: true,
  },
  qualification: {
    type: String,
    enum: ["10th fail", "10th pass", "12th pass"],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

// Export the UserInfo model
module.exports = mongoose.model('UserInfo', infoSchema);
