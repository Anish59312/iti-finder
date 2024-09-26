const mongoose = require('mongoose');

const itiTradeSchema = new mongoose.Schema({
  iti_code: { type: String, required: true },
  trade_id: { type: Number, required: true }, 
});

itiTradeSchema.index({ iti_code: 1, trade_id: 1 }, { unique: true });

module.exports = mongoose.model('ITITrade', itiTradeSchema);
