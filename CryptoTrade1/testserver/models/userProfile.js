const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  userAddress: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  dateOfBirth: { type: Date },
  gender: { type: String },
  country: { type: String },
  city: { type: String },
  bio: { type: String },
  favoriteCategories: [{ type: String }],
  registrationDate: { type: Date, default: Date.now },
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = { UserProfile };
