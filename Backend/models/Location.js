const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    district: {
      type: String,
      required: true,
      enum: Object.keys(districtCityMapping)
    },
    city: {
      type: String,
      required: true,
      validate: {
        validator: function (city) {
          // Check if the city is valid for the selected district
          return districtCityMapping[this.district].includes(city);
        },
        message: props => `${props.value} is not a valid city for the district ${props.instance.district}`
      }
    }
  });

module.exports = mongoose.model('location', locationSchema);
