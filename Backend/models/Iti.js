const mongoose = require('mongoose');

const itiSchema = new mongoose.Schema({
  iti_id: { type: Number, autoIncrement: true, primaryKey: true },
  location_id: { type: Number, required: true },
  taluka: { type: String, required: true },
  address: { type: String, required: true },
  iti_code: { type: String, unique: true, required: true },
  institute_name: { type: String, required: true },
  contact_number: { type: String, required: true },
  iti_type_id: { 
    type: String, 
    enum: ["government", "grant-in-aid", "self-finance"],
    required: true 
  }
});

module.exports = mongoose.model('Iti', itiSchema);
