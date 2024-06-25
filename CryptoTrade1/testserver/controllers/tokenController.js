const tokens = require('../models/tokenModel');

exports.getTokens = (req, res) => {
  res.status(200).json({ tokens });
};
