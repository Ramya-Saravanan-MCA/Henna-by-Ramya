const express = require('express');
const router = express.Router();
const Login = require('../models/Login');
const LoginLog = require('../models/LoginLog'); 

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await Login.findOne({ email });

  if (!user) {
    return res.json({ message: 'User not found' });
  }

  if (user.password !== password) {
    return res.json({ message: 'Incorrect password' });
  }
  await LoginLog.create({ email });
  res.json({ message: 'Login successful', name: user.name });
});

router.get('/getUser/:email', async (req, res) => {
    const user = await Login.findOne({ email: req.params.email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ name: user.name, email: user.email });
  });
  

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await Login.findOne({ email });
  if (exists) {
    return res.json({ message: 'User already exists' });
  }

  const newUser = new Login({ name, email, password });
  await newUser.save();
  res.json({ message: 'Signup successful' });
});

router.post('/check-login-email', async (req, res) => {
  const { email } = req.body;
  const user = await Login.findOne({ email }); // Login is your login model
  if (user) {
    res.json({ exists: true });
  } else {
    res.json({ exists: false });
  }
});


router.post('/forgot-password', async (req, res) => {
    const { email, newPassword } = req.body;
  
    try {
      if (!email || !newPassword) {
        return res.status(400).json({ message: 'Email and new password are required' });
      }
  
      const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/;
      if (!strongPasswordRegex.test(newPassword)) {
        return res.status(400).json({
          message: 'Password must contain uppercase, lowercase, special character, and be at least 6 characters',
        });
      }
  
      const user = await Login.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'Email not found' });
      }
  
      user.password = newPassword;
      await user.save();
  
      res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
module.exports = router;
