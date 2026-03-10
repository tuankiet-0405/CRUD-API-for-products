const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters'],
      maxlength: [50, 'Username cannot exceed 50 characters']
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
    },
    fullName: {
      type: String,
      default: '',
      trim: true,
      maxlength: [100, 'Full name cannot exceed 100 characters']
    },
    avatarUrl: {
      type: String,
      default: 'https://i.sstatic.net/l60Hf.png'
    },
    status: {
      type: Boolean,
      default: false
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
      required: [true, 'Role is required']
    },
    loginCount: {
      type: Number,
      default: 0,
      min: [0, 'Login count cannot be negative']
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Soft delete query helper
userSchema.query.active = function () {
  return this.where({ isDeleted: false });
};

module.exports = mongoose.model('User', userSchema);
