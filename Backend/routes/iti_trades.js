const express = require('express');
const router = express.Router();
const ITITrade = require('../models/ItiTrades'); // Import the model

// Delete an ITI Trade by iti_code and trade_id
// Update an ITI Trade by iti_code and trade_id
// Create a new ITI Trade
// Get a specific ITI Trade by iti_code and trade_id
// Get all ITI Trades
router.get('/', async (req, res) => {
  try {
    const itiTrades = await ITITrade.find();
    res.json(itiTrades);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET route to fetch a document by its _id
router.get('/:id', async (req, res) => {
  console.log('trade document by its _id in iti_trade')
  try {
    const ititradeId = req.params.id;
    const itiTrade = await ITITrade.findById(ititradeId);

    if (!itiTrade) {
      return res.status(404).json({ message: 'Trade not found' });
    }
    console.log(itiTrade)
    res.status(200).json(itiTrade);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.post('/itis-by-trades', async (req, res) => {
  try {
    const { trade_ids } = req.body;
    console.log('In itis by trade inside iti_trade');
    // console.log(trade_ids);

    if (!trade_ids) {
      return res.status(400).json({ message: 'Trade IDs are required' });
    }

    const tradeIdList = trade_ids.split(',').map(Number);

    const itiTrades = await ITITrade.find({ Trades_Offered: { $in: tradeIdList } });

    res.status(200).json({ itis: itiTrades });
  } catch (error) {
    console.error('Error fetching ITIs by trade IDs:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
