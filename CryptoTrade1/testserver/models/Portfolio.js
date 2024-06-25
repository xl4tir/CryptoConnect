const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
    name: { type: String, required: true
    },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true
    }
});

const Portfolio = mongoose.model('Portfolio', PortfolioSchema);
module.exports = Portfolio;
