const intrest = require('../models/UserInterest.js');
const express = require('express');
const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        const {selectedInterests } = req.body;
    
        const intrest_obj = new intrest({
          user: req.user.id, // Assuming the token payload contains the user ID as `id`
          Intrest_index : selectedInterests
        });
        await intrest_obj.save();
        res.status(201).json({
          message: 'User intrest stored successfully',
        });
        console.log('User intrest stored successfully')
      } catch (error) {
        console.error('User intrest stored unsuccessfully', error);
        res.status(500).json({
          message: 'Internal Server Error',
          error: error.message
        });
      }
});


module.exports = router;
