const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

router.get('/summary', async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();

    const serviceCounts = await Booking.aggregate([
      { $group: { _id: '$serviceType', count: { $sum: 1 } } }
    ]);

    res.json({ totalBookings, serviceCounts });
  } catch (err) {
    console.error('Error fetching summary:', err);
    res.status(500).json({ error: 'Failed to fetch summary' });
  }
});

router.get('/bookings', async (req, res) => {
    try {
      const bookings = await Booking.find().sort({ createdAt: -1 });
      res.json(bookings);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      res.status(500).json({ error: 'Failed to fetch bookings' });
    }
  });

  router.get('/monthly-stats', async (req, res) => {
    try {
      const pipeline = [
        {
          $group: {
            _id: { $month: "$createdAt" },
            count: { $sum: 1 }
          }
        },
        {
          $sort: { "_id": 1 }
        }
      ];
  
      const result = await Booking.aggregate(pipeline);
  
      const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];
  
      const data = Array(12).fill(0).map((_, i) => {
        const found = result.find(r => r._id === i + 1);
        return { month: months[i], count: found ? found.count : 0 };
      });
  
      res.json(data);
    } catch (err) {
      console.error('Monthly stats error:', err);
      res.status(500).json({ error: 'Failed to fetch monthly stats' });
    }
  });

  router.get('/recent-bookings', async (req, res) => {
    try {
      const recent = await Booking.find().sort({ createdAt: -1 }).limit(5);
      res.json(recent);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch recent bookings' });
    }
  });
  
module.exports = router;
