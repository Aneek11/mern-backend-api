const express = require('express');
const auth = require('../middleware/auth');
const authorize = require('../middleware/role');
const { createOrder, getMyOrders, getAllOrders, updateOrderStatus } = require('../controllers/orderController');

const router = express.Router();

// user routes
router.post('/', auth, authorize('user','admin'), createOrder);
router.get('/my', auth, authorize('user','admin'), getMyOrders);

// admin routes
router.get('/', auth, authorize('admin'), getAllOrders);
router.put('/:id/status', auth, authorize('admin'), updateOrderStatus);

module.exports = router;
