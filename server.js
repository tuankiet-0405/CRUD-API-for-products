require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/products');
const roleRoutes = require('./routes/roles');
const userRoutes = require('./routes/users');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/products', productRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/users', userRoutes);

// Health check route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'CRUD API is running',
    endpoints: {
      'Products API': {
        'POST /api/products': 'Create a new product',
        'GET /api/products': 'Get all products',
        'GET /api/products/:id': 'Get product by ID',
        'PUT /api/products/:id': 'Update product',
        'DELETE /api/products/:id': 'Delete product'
      },
      'Roles API': {
        'POST /api/roles': 'Create a new role',
        'GET /api/roles': 'Get all roles',
        'GET /api/roles/:id': 'Get role by ID',
        'PUT /api/roles/:id': 'Update role',
        'DELETE /api/roles/:id': 'Delete role (soft delete)'
      },
      'Users API': {
        'POST /api/users': 'Create a new user',
        'GET /api/users': 'Get all users (query params: username)',
        'GET /api/users/:id': 'Get user by ID',
        'PUT /api/users/:id': 'Update user',
        'DELETE /api/users/:id': 'Delete user (soft delete)',
        'POST /api/users/enable': 'Enable user (email, username required)',
        'POST /api/users/disable': 'Disable user (email, username required)',
        'GET /api/users/roles/:roleId/users': 'Get all users by role ID'
      }
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
