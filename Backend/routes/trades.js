const express = require('express');
const router = express.Router();
const Trade = require('../models/Trades.js');

// Create a trade
// Get all trades
router.get('/get_all', async (req, res) => {
  console.log('get all trade inside trade called!!')
  try {
    const trades = await Trade.find();
    res.json(trades);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post('/get-trade-names', async (req, res) => {
  try {
    const { noList } = req.body; // Expecting an array of "no" values from the request body

    // Validate that "noList" is an array and not empty
    if (!Array.isArray(noList) || noList.length === 0) {
      return res.status(400).json({ error: 'Invalid input. "noList" must be a non-empty array.' });
    }

    // Find documents where "no" is in the provided "noList" and only return "tradeName" field
    const trades = await Trade.find({ no: { $in: noList } }, 'tradeName');

    // Extract tradeName values into an array
    const tradeNames = trades.map(trade => trade.tradeName);

    res.json({ tradeNames });
  } catch (error) {
    console.error('Error fetching trade names:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get trade based on intrest


// Get a trade by ID
// Update a trade
// Delete a trade

module.exports = router;
