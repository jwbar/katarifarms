const mongoose = require('mongoose');


// Define the user schema
const  harvestSchema = mongoose.Schema({
  Date: String,
  Radish: Number,
  Daikon: Number,
  Sunflower: Number,
  Peas: Number,
  Broccoli: Number,
  Mustard: Number,
  Fenugreek: Number,
  Tray: Number
  // You can add more fields like firstName, lastName, etc.
});

const Harvest = mongoose.model('Harvest', harvestSchema);

module.exports = Harvest;
