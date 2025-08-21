const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

router.post('/bookings', async (req, res) => {
  try {
    const { name, email, phone, date, serviceType, location, notes, hennaId } = req.body;

    const newBooking = new Booking({
      name,
      email,
      phone,
      date,
      serviceType,
      location,
      notes,
      hennaId,
    });

    await newBooking.save();
    res.status(201).json({ message: 'Booking stored successfully' });
  } catch (error) {
    console.error('Error storing booking:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/by-id/:hennaId', async (req, res) => {
  try {
    const booking = await Booking.findOne({ hennaId: req.params.hennaId });
    if (!booking) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;


