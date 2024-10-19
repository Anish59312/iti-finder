// insert_iti_trade.js

const mongoose = require('mongoose');
const ITITrade = require('../../models/ItiTrades.js'); // Import the ITITrade model
require('dotenv').config({ path: '../../.env' });

const itiTradeData = require('../ITI_TRADE.js'); // Assuming this file contains the data

console.log('total data: ', itiTradeData.length)

const dbURI = process.env.MONGO_URI;

// Function to connect to the MongoDB database
const connectToDatabase = async () => {
    try {
        await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1); // Exit the process with an error code
    }
};

// Function to validate the data
const validateData = (data) => {
    // Check if data meets the schema requirements
    return data.Taluka && data.Institution_Name_and_Address && data.Contact_Number && Array.isArray(data.Trades_Offered);
};

// Function to insert data into MongoDB
const insertData = async (data) => {
    try {
        const newTrade = new ITITrade(data);
        await newTrade.save();
        console.log(`Inserted: ${data.Institution_Name_and_Address}`);
    } catch (error) {
        console.error('Error inserting data:', error);
    }
};

// Main function to run the script
const main = async () => {
    await connectToDatabase(); // Connect to the database

    for (const trade of itiTradeData) {
        // Modify data if needed (currently assumes data is already in the correct format)

        // Validate the modified data
        if (validateData(trade)) {
            // Insert valid data into MongoDB
            await insertData(trade);
        } else {
            console.error('Validation failed for:', trade);
        }
    }

    mongoose.connection.close(); // Close the database connection
};

main();
