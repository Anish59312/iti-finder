const mongoose = require('mongoose');

const districtCityMapping = {
  'DistA': ['City1', 'City2', 'City3'],
  'DistB': ['City4', 'City5'],
  'DistC': ['City6', 'City7', 'City8', 'City9']
};

const infoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // This refers to the 'User' model
        required: true,
      },
    age: {type:Number ,required:true },
    contactNo: {type:Number ,required:true},
    location: {
      district: { 
        type: String, 
        required: true,
        enum: Object.keys(districtCityMapping)
      },
      city: {
        type: String,
        required: true,
        validate: {
          validator: function(city) {
            return districtCityMapping[this.location.district].includes(city);
          },
          message: props => `${props.value} is not a valid city for the district ${props.instance.location.district}`
        }
      }
    },
    qualification: {
        type: String,
        enum: ["10th fail","10th pass","12th pass"],
        required: true
    },    
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('UserInfo', infoSchema);
