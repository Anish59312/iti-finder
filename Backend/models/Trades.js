const mongoose = require("mongoose");

const tradeSchema = new mongoose.Schema({
  no: {
    type: Number,
    unique: true,
    required: true,
  },
  tradeCode: {
    type: Number,
    required: true,
  },
  tradeName: {
    type: String,
    required: true,
  },
  nsqfLevel: {
    type: Number,
    required: true,
  },
  minimumEducationalQualification: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
});

const Trade = mongoose.model("Trade", tradeSchema);

module.exports = Trade;

// const tradeSchema = new mongoose.Schema({
//   trade_id: { type: Number, autoIncrement: true, primaryKey: true },
//   trade_code: { type: String, unique: true, required: true },
//   trade_sr_no: { type: String, required: true },
//   nsqf_level: { type: Number, required: true },
//   trade_type: { type: String, required: true },
//   duration: { type: String, required: true },
//   minimum_qualification_id: { type: Number }, // For referencing other models
//   syllabus: { type: String, required: true },
// });

// module.exports = mongoose.model("Trade", tradeSchema);
