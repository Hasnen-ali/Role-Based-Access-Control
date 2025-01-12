const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();
const { SECRET_KEY } = require('../config');

// Register User
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const newUser = await User.create({ username, password, role });
    res.status(201).json({ message: 'User registered', user: newUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login User
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Logged in', token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
