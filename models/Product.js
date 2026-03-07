const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a product name'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
      min: [0, 'Price cannot be negative']
    },
    quantity: {
      type: Number,
      required: [true, 'Please add quantity'],
      min: [0, 'Quantity cannot be negative'],
      default: 0
    },
    category: {
      type: String,
      trim: true
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/300'
    },
    inStock: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Product', productSchema);
