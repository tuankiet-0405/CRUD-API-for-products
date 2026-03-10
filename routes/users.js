const express = require('express');
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  enableUser,
  disableUser,
  getUsersByRoleId
} = require('../controllers/userController');

// Special routes FIRST (before /:id)
router.get('/roles/:roleId/users', getUsersByRoleId); // GET /api/users/roles/:roleId/users
router.post('/enable', enableUser);        // POST   /api/users/enable - Kích hoạt user
router.post('/disable', disableUser);      // POST   /api/users/disable - Vô hiệu hóa user

// Standard CRUD routes
router.post('/', createUser);              // POST   /api/users - Tạo
router.get('/', getAllUsers);              // GET    /api/users - Lấy tất cả (với query username)
router.put('/:id', updateUser);            // PUT    /api/users/:id - Cập nhật
router.delete('/:id', deleteUser);         // DELETE /api/users/:id - Xóa mềm
router.get('/:id', getUserById);           // GET    /api/users/:id - Lấy theo ID (LAST)

module.exports = router;
