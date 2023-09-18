// DeliveryDataset.js
const mongoose = require('mongoose');

const deliveryDatasetSchema = new mongoose.Schema({
    tourDate: String,
    username: String,
    telegram: String,
    lastName: String,
    phone: String,
    address: String,
    plz: String,
    deliveryInstructions: String,
    deliveryStatus: Boolean,
});

module.exports = mongoose.model('DeliveryDataset', deliveryDatasetSchema);
