const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

const router = express.Router();

// @route   POST /api/auth/register
router.post('/register', [
  check('name', 'Name is required').notEmpty(),
  check('email', 'Valid email required').isEmail(),
  check('password', 'Password must be 6+ chars').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { name, email, password } = req.body;

    // check if user exists
    let user = await User.findOne({ email });
    if(user) return res.status(400).json({ msg: 'User already exists' });

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashed });
    await user.save();

    // generate token
    const payload = { id: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    res.cookie('token', token, { httpOnly: true });
    res.status(201).json({ msg: 'User registered', user: { id: user._id, name, email, role: user.role }, token });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// @route   POST /api/auth/login
router.post('/login', [
  check('email', 'Valid email required').isEmail(),
  check('password', 'Password is required').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    // generate token
    const payload = { id: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    res.cookie('token', token, { httpOnly: true });
    res.json({ msg: 'Login success', user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
