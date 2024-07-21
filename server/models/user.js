// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  customCategory: { type: [String], required: true,default:[] }
});

const User = mongoose.model('User', userSchema);

module.exports = mongoose.model.User || User;
