const Product = require('../models/Product');

// create product (admin only)
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const image = req.file ? req.file.path : null;

    const product = new Product({
      name,
      description,
      price,
      image,
      createdBy: req.user.id
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('createdBy', 'name email');
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
