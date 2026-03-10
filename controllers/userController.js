const User = require('../models/User');
const Role = require('../models/Role');

// CREATE - Tạo user mới
exports.createUser = async (req, res) => {
  try {
    const { username, password, email, fullName, avatarUrl, role } = req.body;

    // Validate
    if (!username || !password || !email || !role) {
      return res.status(400).json({
        success: false,
        message: 'Username, password, email, and role are required'
      });
    }

    // Check if role exists
    const roleExists = await Role.findById(role);
    if (!roleExists) {
      return res.status(400).json({
        success: false,
        message: 'Role does not exist'
      });
    }

    const user = new User({
      username,
      password,
      email,
      fullName,
      avatarUrl,
      role
    });

    const savedUser = await user.save();
    await savedUser.populate('role');

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: savedUser
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// READ - Lấy tất cả users
exports.getAllUsers = async (req, res) => {
  try {
    const { username } = req.query;
    let query = User.where({ isDeleted: false }).populate('role');

    // Filter by username (includes)
    if (username) {
      query = User.where({ isDeleted: false, username: { $regex: username, $options: 'i' } }).populate('role');
    }

    const users = await query;

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// READ - Lấy user theo ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('role');

    if (!user || user.isDeleted) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// UPDATE - Cập nhật user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, email, fullName, avatarUrl, role } = req.body;

    let user = await User.findById(id);

    if (!user || user.isDeleted) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (username) user.username = username;
    if (password) user.password = password;
    if (email) user.email = email;
    if (fullName !== undefined) user.fullName = fullName;
    if (avatarUrl) user.avatarUrl = avatarUrl;
    if (role) user.role = role;

    const updatedUser = await user.save();
    await updatedUser.populate('role');

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// DELETE - Soft delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user.isDeleted = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ENABLE - Kích hoạt user (thay đổi status = true)
exports.enableUser = async (req, res) => {
  try {
    const { email, username } = req.body;

    if (!email || !username) {
      return res.status(400).json({
        success: false,
        message: 'Email and username are required'
      });
    }

    const user = await User.findOne({ email, username, isDeleted: false });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found with provided email and username'
      });
    }

    user.status = true;
    const updatedUser = await user.save();
    await updatedUser.populate('role');

    res.status(200).json({
      success: true,
      message: 'User enabled successfully',
      data: updatedUser
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// DISABLE - Vô hiệu hóa user (thay đổi status = false)
exports.disableUser = async (req, res) => {
  try {
    const { email, username } = req.body;

    if (!email || !username) {
      return res.status(400).json({
        success: false,
        message: 'Email and username are required'
      });
    }

    const user = await User.findOne({ email, username, isDeleted: false });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found with provided email and username'
      });
    }

    user.status = false;
    const updatedUser = await user.save();
    await updatedUser.populate('role');

    res.status(200).json({
      success: true,
      message: 'User disabled successfully',
      data: updatedUser
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// GET users by role ID
exports.getUsersByRoleId = async (req, res) => {
  try {
    const { roleId } = req.params;

    // Check if role exists
    const role = await Role.findById(roleId);
    if (!role) {
      return res.status(404).json({
        success: false,
        message: 'Role not found'
      });
    }

    const users = await User.find({ role: roleId, isDeleted: false }).populate('role');

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
