const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: String,
    password: String,
    email: { type: String, unique: true },
    role: String,
    confirmed: Boolean,
    tokens: [],
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
