const express = require('express');
const router = express.Router();
const Iti = require('../models/Iti.js');

// Create a new ITI
router.post('/', async (req, res) => {
  try {
    const iti = new Iti(req.body);
    await iti.save();
    res.status(201).json(iti);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Add multiple ITI records at once
router.post('/bulk', async (req, res) => {
    try {
      const itiRecords = req.body; // Expect an array of ITI records in the request body
      const insertedRecords = await Iti.insertMany(itiRecords);
      res.status(201).json(insertedRecords); // Return the newly inserted records
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });  

// Get all ITIs
router.get('/', async (req, res) => {
  try {
    const itis = await Iti.find();
    res.json(itis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get an ITI by ID
router.get('/:id', async (req, res) => {
  try {
    const iti = await Iti.findById(req.params.id);
    if (iti) {
      res.json(iti);
    } else {
      res.status(404).json({ message: 'ITI not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an ITI by ID
router.put('/:id', async (req, res) => {
  try {
    const iti = await Iti.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (iti) {
      res.json(iti);
    } else {
      res.status(404).json({ message: 'ITI not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an ITI by ID
router.delete('/:id', async (req, res) => {
  try {
    const iti = await Iti.findByIdAndDelete(req.params.id);
    if (iti) {
      res.json({ message: 'ITI deleted successfully' });
    } else {
      res.status(404).json({ message: 'ITI not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const express = require('express');
const ITI = require('../models/iti');  // ITI model
const ITITrade = require('../models/itiTrade');  // ITITrade model

// Route to get ITIs by trade IDs
router.get('/itis-by-trades', async (req, res) => {
  try {
    const { tradeIds } = req.query;

    if (!tradeIds || tradeIds.length === 0) {
      return res.status(400).json({ error: 'No trade IDs provided' });
    }

    const tradeIdArray = tradeIds.split(',').map(id => parseInt(id, 10));

    // Find ITIs that provide any of the trades in tradeIdArray
    const itiTrades = await ITITrade.find({ trade_id: { $in: tradeIdArray } });

    // Extract ITI codes from itiTrades
    const itiCodes = itiTrades.map(itiTrade => itiTrade.iti_code);

    // Find ITIs by the extracted ITI codes
    const itis = await ITI.find({ iti_code: { $in: itiCodes } });

    res.json(itis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
