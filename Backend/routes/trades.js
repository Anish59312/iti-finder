const express = require('express');
const router = express.Router();
const Trade = require('../models/Trades.js');
const InterestTrade = require('../models/interestTrade');

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

router.post('/recommend',async (req,res) => {
  const { InterestIds } = req.body;
  console.log('recommend called in trades')
  console.log("InterestIds: ",InterestIds)


  let records = [];
  try {
    records = await InterestTrade.find();
    console.log('records,', records);
  } catch (error) {
    console.error('Error fetching interest trades:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
  
  var RecommendedTradeIds = []

  console.log(records.length)

  if(records.length>0){
  RecommendedTradeIds = recommendFun(InterestIds,records)
  console.log("pure maal",RecommendedTradeIds)
  RecommendedTradeIds = completeList(RecommendedTradeIds)
  console.log('Recommended trade ids: ',RecommendedTradeIds)
  }




  try {
    if(RecommendedTradeIds.length>0){
        const trades = await Trade.find({ no: { $in: RecommendedTradeIds } });
        // const tradesInOrder = RecommendedTradeIds.map(no => trades.find(trade => trade.no === no));
        // res.json(tradesInOrder);
        const tradesInOrder = RecommendedTradeIds
    .map(no => trades.find(trade => trade.no === no))
    .filter(trade => trade !== undefined); // Filter out undefined elements

res.json(tradesInOrder);

    }
    else{
      const trades = await Trade.find();
      res.json(trades);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
})

function completeList(arr) {
  // Step 1: Remove duplicates while maintaining original order
  let uniqueArr = [];
  for (let num of arr) {
      if (!uniqueArr.includes(num)) {
          uniqueArr.push(num);
      }
  }

  // Step 2: Create a Set for quick lookup of existing numbers
  let existingNumbers = new Set(uniqueArr);

  // Step 3: Create the result array and add unique numbers first
  let result = [...uniqueArr];

  // Step 4: Append numbers starting from 0 until the length is 50
  let num = 0;
  while (result.length < 50) {
      // Check if the number is already in the array
      if (!existingNumbers.has(num)) {
          result.push(num);
      }
      num++;
  }

  return result;
}

function recommendFun(userSelectedInterests,records){
  
    
  const data = {};

  records.forEach(record => {
    const keyString = record.key.join(',');  // Convert the key array to a string (e.g., "1,2")
    data[keyString] = record.values;         // Assign values to the key
  });

console.log(data)

const allInterests = Array.from({ length: 10 }, (_, i) => i + 1); // Interests are [1, 2, ..., 10]

// Convert interest array to binary vector
function interestToVector(interestArray, allInterests) {
  return allInterests.map(interest => interestArray.includes(interest) ? 1 : 0);
}

// Calculate Jaccard similarity
function calculateSimilarity(userVector, otherVector) {
  const intersection = userVector.reduce((acc, val, i) => acc + (val && otherVector[i]), 0);
  const union = userVector.reduce((acc, val, i) => acc + (val || otherVector[i]), 0);
  return union === 0 ? 0 : intersection / union;
}

// Recommend courses based on collaborative filtering
function recommendCourses(selectedInterests, data, allInterests, topN = 15) {
  const selectedVector = interestToVector(selectedInterests, allInterests);
  const similarityScores = [];

  // Compute similarity with other users
  for (const [interestString, courses] of Object.entries(data)) {
      const interestArray = interestString.split(',').map(Number);
      const otherVector = interestToVector(interestArray, allInterests);
      const similarity = calculateSimilarity(selectedVector, otherVector);
      similarityScores.push({ similarity, courses });
  }

  // Sort by similarity scores in descending order
  similarityScores.sort((a, b) => b.similarity - a.similarity);

  // Collect recommended courses
  const recommendedCourses = {};
  for (const { similarity, courses } of similarityScores) {
      courses.forEach(course => {
          recommendedCourses[course] = (recommendedCourses[course] || 0) + similarity;
      });
  }

  // Sort recommended courses by their similarity score
  const sortedRecommendations = Object.entries(recommendedCourses)
      .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
      .map(([course]) => Number(course));

  // Return the top N courses
  return sortedRecommendations.slice(0, topN);
}

// Example usage: Recommend courses for user with interests [1, 2]
return recommendCourses(userSelectedInterests, data, allInterests);
}


// Get trade based on intrest
// Get a trade by ID
// Update a trade
// Delete a trade

module.exports = router;
