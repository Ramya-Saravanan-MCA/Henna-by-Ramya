// const mongoose = require('mongoose');

// const loginSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, required: true, unique: true },
//   password: String,
// });

// module.exports = mongoose.model('Login', loginSchema);

const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  lastLogin: String,
  logs: [
    {
      loginTime: String,
    },
  ],
});

module.exports = mongoose.model('Login', loginSchema);
