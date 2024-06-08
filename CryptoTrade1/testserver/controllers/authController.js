const { User } = require('../models/user');
const { UserProfile } = require('../models/userProfile');

class AuthController {
  async login(req, res) {
    try {
      const { userAddress } = req.body;
      if (!userAddress) {
        return res.status(400).send({ message: 'User address is required' });
      }

      let user = await User.findOne({ userAddress });
      if (!user) {
        user = new User({ userAddress });
        await user.save();
      }

      req.session.userAddress = user.userAddress;
      req.session.userId = user._id; // Додано userId в сесію
      req.session.save();

      res.status(200).send({ message: 'Logged in successfully' });
    } catch (error) {
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }


  async getUser(req, res) {
  
    if (!req.session.userAddress) {
      return res.status(401).send({ message: 'Unauthorized' });
    }

    try {
      const user = await User.findOne({ userAddress: req.session.userAddress })
        .select('-__v')
        .populate('profile'); // додано заповнення профілю

      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }

  async logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).send({ message: 'Logout failed' });
      }
      res.status(200).send({ message: 'Logged out successfully' });
    });
  }
}

module.exports = new AuthController();
