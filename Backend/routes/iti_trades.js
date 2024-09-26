const express = require('express');
const router = express.Router();
const ITITrade = require('../models/ItiTrades'); // Import the model

// Create a new ITI Trade
router.post('/', async (req, res) => {
  try {
    const itiTrade = new ITITrade(req.body);
    await itiTrade.save();
    res.status(201).json(itiTrade); // Return the newly created ITITrade
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all ITI Trades
router.get('/', async (req, res) => {
  try {
    const itiTrades = await ITITrade.find();
    res.json(itiTrades);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get a specific ITI Trade by iti_code and trade_id
router.get('/:iti_code/:id', async (req, res) => {
  try {
    const itiTrade = await ITITrade.findOne({
      iti_code: req.params.iti_code,
      trade_id: req.params.id,
    });

    if (itiTrade) {
      res.json(itiTrade);
    } else {
      res.status(404).json({ message: 'ITI Trade not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update an ITI Trade by iti_code and trade_id
router.put('/:iti_code/:trade_id', async (req, res) => {
  try {
    const itiTrade = await ITITrade.findOneAndUpdate(
      { iti_code: req.params.iti_code, trade_id: req.params.trade_id },
      req.body,
      { new: true, runValidators: true } // Ensure the document is updated and valid
    );

    if (itiTrade) {
      res.json(itiTrade);
    } else {
      res.status(404).json({ message: 'ITI Trade not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete an ITI Trade by iti_code and trade_id
router.delete('/:iti_code/:trade_id', async (req, res) => {
  try {
    const itiTrade = await ITITrade.findOneAndDelete({
      iti_code: req.params.iti_code,
      trade_id: req.params.trade_id,
    });

    if (itiTrade) {
      res.json({ message: 'ITI Trade deleted' });
    } else {
      res.status(404).json({ message: 'ITI Trade not found' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
