const express = require('express');
const router = express.Router();
const InterestTrade = require('../models/interestTrade');

router.post('/insert', async (req, res) => {
    const { InterestIds, TradesSelected } = req.body;

    console.log("Inside InterestTrade insert route", InterestIds, TradesSelected);
  
    // Validate input
    if (!Array.isArray(InterestIds) || !Array.isArray(TradesSelected)) {
      return res.status(400).json({ error: 'Invalid data format. "InterestIds" and "TradesSelected" must be arrays.' });
    }

    if (InterestIds.length === 0 || TradesSelected.length === 0) {
        return res.status(400).json({ message: 'Data not passed' });
    }
    
    console.log("In the insert of Interest Trade")
    console.log(InterestIds,TradesSelected)

    // Create a new entry and map the fields correctly
    const newData = new InterestTrade({
      key: InterestIds,        // Map InterestIds to 'key'
      values: TradesSelected,  // Map TradesSelected to 'values'
    });
  
    try {
      // Save to the database
      const savedData = await newData.save();
      res.status(201).json({ message: 'Data inserted successfully', data: savedData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to insert data' });
    }
});

module.exports = router;
