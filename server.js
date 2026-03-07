require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/products');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/products', productRoutes);

// Health check route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Products API is running',
    endpoints: {
      'POST /api/products': 'Create a new product',
      'GET /api/products': 'Get all products',
      'GET /api/products/:id': 'Get product by ID',
      'PUT /api/products/:id': 'Update product',
      'DELETE /api/products/:id': 'Delete product'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Server error',
    error: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
  console.log(`✓ API Documentation: http://localhost:${PORT}`);
});
