const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
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
  profilePhoto: { type: String },
  backgroundPhoto: { type: String },
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' }]
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

module.exports = { UserProfile };
