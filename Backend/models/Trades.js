const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  trade_id: { type: Number, autoIncrement: true, primaryKey: true },
  trade_code: { type: String, unique: true, required: true },
  trade_sr_no: { type: String, required: true },
  nsqf_level: { type: Number, required: true },
  trade_type: { type: String, required: true },
  duration: { type: String, required: true },
  minimum_qualification_id: { type: Number }, // For referencing other models
  syllabus: { type: String, required: true },
});

module.exports = mongoose.model('Trade', tradeSchema);
