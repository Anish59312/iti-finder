const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    district: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    }
  });

module.exports = mongoose.model('location', locationSchema);
