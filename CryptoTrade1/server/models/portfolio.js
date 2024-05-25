const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { type: String, required: true } // Поле 'author' обов'язкове для заповнення
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = Portfolio;
