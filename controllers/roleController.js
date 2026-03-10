const Role = require('../models/Role');

// CREATE - Tạo role mới
exports.createRole = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Role name is required'
      });
    }

    const role = new Role({
      name,
      description
    });

    const savedRole = await role.save();

    res.status(201).json({
      success: true,
      message: 'Role created successfully',
      data: savedRole
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// READ - Lấy tất cả roles
exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find({ isDeleted: false });

    res.status(200).json({
      success: true,
      count: roles.length,
      data: roles
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// READ - Lấy role theo ID
exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);

    if (!role || role.isDeleted) {
      return res.status(404).json({
        success: false,
        message: 'Role not found'
      });
    }

    res.status(200).json({
      success: true,
      data: role
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// UPDATE - Cập nhật role
exports.updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    let role = await Role.findById(id);

    if (!role || role.isDeleted) {
      return res.status(404).json({
        success: false,
        message: 'Role not found'
      });
    }

    if (name) role.name = name;
    if (description !== undefined) role.description = description;

    const updatedRole = await role.save();

    res.status(200).json({
      success: true,
      message: 'Role updated successfully',
      data: updatedRole
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// DELETE - Soft delete role
exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);

    if (!role) {
      return res.status(404).json({
        success: false,
        message: 'Role not found'
      });
    }

    role.isDeleted = true;
    await role.save();

    res.status(200).json({
      success: true,
      message: 'Role deleted successfully',
      data: role
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
