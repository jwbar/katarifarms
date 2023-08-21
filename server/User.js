const mongoose = require('mongoose');


// Define the user schema
const userSchema = mongoose.Schema({
  role:  String,
  username: String,
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  phone: String,
  telegram: String,
  CrcWallet: String,
  address: String,
  plz: String,
  deliveryInstructions: String,
  deliveryDay: String,
  subscriptionActive: String,
  subscriptionStatus: Number,
  amount: Number,
  subscriptionDate: String,
  authenticatedStatus: String,
  lastPaymentOn: String,
  // You can add more fields like firstName, lastName, etc.
});

const User = mongoose.model('User', userSchema);

module.exports = User;
