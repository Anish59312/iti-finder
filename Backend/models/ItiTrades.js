const mongoose = require('mongoose');

// Define the schema for the ITI trades
const itiTradeSchema = new mongoose.Schema({
  Taluka: {
    type: String,
    required: true
  },
  Institution_Name_and_Address: {
    type: String,
    required: true
  },
  Contact_Number: {
    type: String,
    required: true
  },
  Trades_Offered: [{
    type: Number, // Store the trade 'no' here as plain numbers
    required: true
  }]
});

// Create the model from the schema
const ITITrade = mongoose.model('ITITrade', itiTradeSchema);

module.exports = ITITrade;
