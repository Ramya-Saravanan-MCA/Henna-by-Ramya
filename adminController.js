const Booking = require('../models/Booking');
const LoginLog = require('../models/Login');

const getTimeline = async (req, res) => {
  try {
    const recentBookings = await Booking.find().sort({ createdAt: -1 }).limit(5);
    const recentLogins = await LoginLog.find().sort({ time: -1 }).limit(5);

    const timelineEvents = [
      ...recentBookings.map(b => ({
        type: 'booking',
        user: b.name,
        service: b.serviceType,
        time: b.createdAt
      })),
      ...recentLogins.map(l => ({
        type: 'login',
        user: l.username || 'Unknown',
        time: l.time
      }))
    ];

    timelineEvents.sort((a, b) => new Date(b.time) - new Date(a.time));

    res.json(timelineEvents);
  } catch (err) {
    console.error('Timeline fetch error:', err);
    res.status(500).json({ error: 'Error fetching timeline' });
  }
};

module.exports = {
  getAdminSummary,
  getBookings,
  getLogs,
  getTimeline 
};
