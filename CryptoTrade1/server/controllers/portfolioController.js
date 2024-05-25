const Portfolio = require('../models/portfolio');

class PortfolioController {
  async createPortfolio(req, res) {
    const { name } = req.body;

    try {

    const portfolio = new Portfolio({ name, author:  req.user._id }); // Передача логіну користувача як автора портфоліо
    await portfolio.save();
    res.status(201).json(portfolio);
    } catch (error) {
    console.error('Помилка при створенні портфоліо', error);
    res.status(500).json({ message: 'Помилка сервера при створенні портфоліо' });
    }

}


  async getUserPortfolios(req, res) {


    try {
      const portfolios = await Portfolio.find({ author:  req.user._id });
      res.json(portfolios);
    } catch (error) {
      console.error('Помилка при отриманні портфоліо', error);
      res.status(500).json({ message: 'Помилка сервера при отриманні портфоліо' });
    }
  }
}

module.exports = new PortfolioController();
