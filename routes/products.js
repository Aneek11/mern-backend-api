const express = require('express');
const auth = require('../middleware/auth');
const authorize = require('../middleware/role');
const upload = require('../middleware/upload');
const { createProduct, getProducts } = require('../controllers/productController');
const { check, validationResult } = require('express-validator');

const router = express.Router();

// validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// public route - get all products
router.get('/', getProducts);

// admin only - create product with validation
router.post(
  '/',
  auth,
  authorize('admin'),
  upload.single('image'),
  [
    check('name', 'Name is required').notEmpty(),
    check('price', 'Price must be a number').isNumeric()
  ],
  validate,
  createProduct
);

module.exports = router;
