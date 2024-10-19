const mongoose = require('mongoose');
const ITI = require('../../models/Iti.js'); // assuming the model is in iti.js
require('dotenv').config();

const itiData = require('../ITI.js');

// Function to convert keys of the data
function convertKeys(item) {
  return {
    DISTRICT: item['DISTRICT'],
    TALUKA: item['TALUKA'],
    ITI_TYPE: item['ITI TYPE'],  // Convert 'ITI TYPE' to 'ITI_TYPE'
    ITI_NAME: item['ITI NAME'],  // Convert 'ITI NAME' to 'ITI_NAME'
    ITI_CODE: item['ITI CODE']   // Convert 'ITI CODE' to 'ITI_CODE'
  };
}

// Convert the list keys to match the Mongoose schema
const formattedData = itiData.map(convertKeys);

// Function to validate the list against the Mongoose schema
async function validateAndReturnInvalidIndexes(dataList) {
  const invalidIndexes = [];

  for (let i = 0; i < dataList.length; i++) {
    const item = dataList[i];
    try {
      await ITI.validate(item); // Validate against the Mongoose schema
    } catch (error) {
      // If validation fails, record the index
      invalidIndexes.push(i);
    }
  }

  return invalidIndexes;
}

const dbURI = process.env.MONGO_URI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');

    // Insert data into the collection
    // ITI.insertMany(formattedData)
    //   .then(() => {
    //     console.log('Data inserted successfully');
    //     mongoose.connection.close(); // Close the connection after the insert
    //   })
    //   .catch((err) => {
    //     console.error('Error inserting data: ', err);
    //     mongoose.connection.close();
    //   });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB: ', err);
  });


// Run validation
// validateAndReturnInvalidIndexes(formattedData)
// .then((invalidIndexes) => {
//   console.log('Invalid indexes:', invalidIndexes);
//   mongoose.connection.close(); // Close the connection if necessary
// })
// .catch((err) => {
//   console.error('Error validating data:', err);
//   mongoose.connection.close();
// });
