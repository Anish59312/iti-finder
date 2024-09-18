// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const districtCityMapping = {
  'DistA': ['City1', 'City2', 'City3'],
  'DistB': ['City4', 'City5'],
  'DistC': ['City6', 'City7', 'City8', 'City9']
};

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: {type:Number ,required:true },
  contactNo: {type:Number ,required:true},
  location: {
    district: { 
      type: String, 
      required: false,
      enum: Object.keys(districtCityMapping)
    },
    city: {
      type: String,
      required: false,
      validate: {
        validator: function(city) {
          return districtCityMapping[this.location.district].includes(city);
        },
        message: props => `${props.value} is not a valid city for the district ${props.instance.location.district}`
      }
    }
  },
  createdAt: { type: Date, default: Date.now },
  qualification: {
    type: String,
    enum: ["10th fail","10th pass","12th pass"],
    required: false
  },
});

// Hash password before saving user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password for login
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
