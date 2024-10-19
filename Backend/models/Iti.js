const mongoose = require('mongoose');

const itiSchema = new mongoose.Schema({
  DISTRICT: { type: String, required: true },
  TALUKA: { type: String, required: true },
  ITI_TYPE: { type: String, required: true },
  ITI_NAME: { type: String, required: true },
  ITI_CODE: { type: String, required: true }
});

// const itiSchema = new mongoose.Schema({
//   location_id: { type: Number, required: true },
//   taluka: { type: String, required: true },
//   address: { type: String, required: true },
//   iti_code: { type: String, unique: true, required: true },
//   institute_name: { type: String, required: true },
//   contact_number: { type: String, required: true },
//   iti_type_id: { 
//     type: String, 
//     enum: ["government", "grant-in-aid", "self-finance"],
//     required: true 
//   }
// });

module.exports = mongoose.model('iti', itiSchema);
