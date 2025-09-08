const Order = require('../models/Order');
const Product = require('../models/Product');

// create new order (user)
exports.createOrder = async (req, res) => {
  try {
    const { items } = req.body;

    // calculate total price
    let totalPrice = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) return res.status(404).json({ msg: `Product not found: ${item.product}` });
      totalPrice += product.price * (item.qty || 1);
    }

    const order = new Order({
      user: req.user.id,
      items,
      totalPrice
    });

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// get my orders (user)
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('items.product', 'name price');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// get all orders (admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').populate('items.product', 'name price');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// update order status (admin)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ msg: 'Order not found' });

    order.status = status;
    await order.save();

    res.json(order);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
