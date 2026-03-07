const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

// Routes
router.post('/', createProduct);           // POST   /api/products - Tạo
router.get('/', getAllProducts);            // GET    /api/products - Lấy tất cả
router.get('/:id', getProductById);         // GET    /api/products/:id - Lấy theo ID
router.put('/:id', updateProduct);          // PUT    /api/products/:id - Cập nhật
router.delete('/:id', deleteProduct);       // DELETE /api/products/:id - Xóa

module.exports = router;
