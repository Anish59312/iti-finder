const express = require('express');
const router = express.Router();
const Trade = require('../models/Trades.js');

// Create a trade
router.post('/', async (req, res) => {
  try {
    const trade = await Trade.create(req.body);
    res.json(trade);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Get all trades
router.get('/', async (req, res) => {
  try {
    const trades = await Trade.find();
    res.json(trades);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Get a trade by ID
router.get('/:id', async (req, res) => {
  try {
    const trade = await Trade.findById(req.params.id);
    if (trade) {
      res.json(trade);
    } else {
      res.status(404).send('Trade not found');
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Update a trade
router.put('/:id', async (req, res) => {
  try {
    const trade = await Trade.findById(req.params.id);
    if (trade) {
      await trade.updateOne(req.body);
      res.json(trade);
    } else {
      res.status(404).send('Trade not found');
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Delete a trade
router.delete('/:id', async (req, res) => {
  try {
    const trade = await Trade.findById(req.params.id);
    if (trade) {
      await trade.deleteOne();
      res.send('Trade deleted');
    } else {
      res.status(404).send('Trade not found');
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
