require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// connect DB
connectDB();

// middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// error handling (temporary)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);


const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);


const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);


const orderRoutes = require('./routes/orders');
app.use('/api/orders', orderRoutes);




const { errorHandler } = require('./middleware/errorHandler');
app.use(errorHandler);
