const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  serviceType: String,
  date: String,
  location: String,
  notes: String,
  hennaId: String
}, { timestamps: true }); 

module.exports = mongoose.model('Booking', bookingSchema);
