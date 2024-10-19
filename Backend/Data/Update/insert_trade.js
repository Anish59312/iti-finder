const mongoose = require('mongoose');
const TradeModel = require('../../models/Trades.js'); // assuming the model is in iti.js
require('dotenv').config({ path: '../../.env' });

const TradeData = require('../TRADE.js');

const dbURI = process.env.MONGO_URI;

const connectToDatabase = async () => {
    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Successfully connected to the database');
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1); // Exit the process if connection fails
    }
};

// Function to modify the trade data according to the schema
const modifyTradeData = (tradeData) => {
    return tradeData.map(trade => ({
        no: trade['No.'], // Map "No." to "no"
        tradeCode: trade['Trade_Code'], // Map "Trade_Code" to "tradeCode"
        tradeName: trade['Trade_Name'], // Map "Trade_Name" to "tradeName"
        nsqfLevel: trade['NSQF'], // Map "NSQF" to "nsqfLevel"
        minimumEducationalQualification: trade['Minimum_Educational_Qualification'], // Map to "minimumEducationalQualification"
        type: trade['Type'], // Map "Type" to "type"
        duration: trade['Duration'] // Map "Duration" to "duration"
    }));
};

// Function to validate trade data using the Mongoose schema
const validateTradeData = async (tradeData) => {
    const validTrades = [];
    const invalidTrades = [];

    // Iterate over each trade data entry and validate it
    for (const trade of tradeData) {
        const tradeDocument = new TradeModel(trade); // Create a Mongoose document from the modified trade data

        try {
            await tradeDocument.validate(); // Validate the document
            validTrades.push(trade); // If valid, add to the validTrades array
        } catch (error) {
            // If validation fails, add the trade entry and validation errors to the invalidTrades array
            invalidTrades.push({ trade, errors: error.errors });
        }
    }

    return { validTrades, invalidTrades }; // Return both valid and invalid trades
};

// Insert modified trade data into the database
const insertTradeData = async (validTrades) => {
    try {
        // Insert only valid trade data into the database
        await TradeModel.insertMany(validTrades);
        console.log('Valid trade data inserted successfully');
    } catch (error) {
        console.error('Error inserting valid trade data:', error);
    }
};

// Main function to run the database connection, validate, and insert data
const run = async () => {
    await connectToDatabase();

    // Modify the trade data according to schema
    const modifiedTrades = modifyTradeData(TradeData);

    // Validate the trade data
    const { validTrades, invalidTrades } = await validateTradeData(modifiedTrades);

    if (invalidTrades.length > 0) {
        console.log('Invalid trades found, skipping those:', invalidTrades.length);
    }

    if (validTrades.length > 0) {
        // Insert only valid trades into the database
        await insertTradeData(validTrades);
    } else {
        console.log('No valid trades to insert');
    }

    mongoose.connection.close(); // Close the connection after completion
};

run();
