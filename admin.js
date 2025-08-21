// backend/routes/admin.js or similar
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking'); 

router.get('/admin', async (req, res) => {
  try {
    const bookings = await Booking.find();

    const totalBookings = bookings.length;

    const serviceCounts = {};
    bookings.forEach(booking => {
      const service = booking.serviceType;
      serviceCounts[service] = (serviceCounts[service] || 0) + 1;
    });

    res.json({ totalBookings, serviceCounts, bookings });
  } catch (err) {
    console.error('Error fetching admin data:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
