const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  key: {
    type: [Number],
    required: true,
  },
  values: {
    type: [Number],
    required: true,
  }
});

// Example: tupleKey will store "1,2" for (1,2) tuple
const InterestTrade = mongoose.model('InterestTrade', dataSchema);

module.exports = InterestTrade;


// const mongoose = require('mongoose');

// // Define the schema for the data
// const dataSchema = new mongoose.Schema({
//   key: {
//     type: [Number],
//     required: true
//   },
//   values: {
//     type: [Number],
//     required: true
//   }
// });

// // Create a Mongoose model based on the schema
// const DataModel = mongoose.model('InterestTrade', dataSchema);

// // Initialize data (this would typically be inserted into a database)
// async function initializeData() {
//   const dataEntries = [
//     { key: [1, 2], values: [5, 4, 2] },
//     { key: [3, 5], values: [10, 15, 20] },
//     { key: [4, 6], values: [25, 30, 35] },
//     { key: [1, 8], values: [40, 45, 50] },
//     { key: [7, 9], values: [55, 60, 65] },
//     { key: [2, 10], values: [70, 75, 80] },
//     { key: [3], values: [85, 90, 95] },
//     { key: [9, 6], values: [100, 99, 98] },
//     { key: [1, 2, 4], values: [12, 22, 32] },
//     { key: [5, 8, 10], values: [42, 52, 62] },
//     { key: [6, 7, 9], values: [72, 82, 92] },
//     { key: [1, 3, 5], values: [15, 25, 35] },
//     { key: [4, 7], values: [65, 75, 85] },
//     { key: [2, 6, 10], values: [95, 85, 75] },
//     { key: [8, 9], values: [50, 60, 70] },
//     { key: [1, 8, 4, 7], values: [15, 25, 35, 45] },
//     { key: [3, 5, 9], values: [55, 65, 75, 85] }
//   ];

//   // Insert all data entries into the database
//   await DataModel.insertMany(dataEntries);
//   console.log('Data initialized successfully');
// }

// // Connect to MongoDB and initialize data
// url = 'mongodb+srv://smitshah084:qasdfghjklp@cluster0.mr1dv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
// mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('MongoDB connected');
//     initializeData();
//   })
//   .catch(err => console.log('Failed to connect to MongoDB', err));
