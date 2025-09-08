const express = require('express');
const auth = require('../middleware/auth');
const authorize = require('../middleware/role');
const router = express.Router();

// @route   GET /api/users/me
// @desc    Get logged-in user's profile
// @access  Private
router.get('/me', auth, (req, res) => {
  res.json({ msg: 'This is your profile', user: req.user });
});

// @route   GET /api/users/admin
// @desc    Admin-only route
// @access  Private/Admin
router.get('/admin', auth, authorize('admin'), (req, res) => {
  res.json({ msg: 'Welcome Admin! Only you can see this.' });
});

module.exports = router;
