const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userAddress: { type: String, required: true, unique: true },
  registrationDate: { type: Date, default: Date.now },
  profile: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' }
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
