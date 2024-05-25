const {User} = require('../models/user')

class authController {
    async getUser(req, res) {
        try {
            
            const user = await User.findOne({  _id : req.user._id});
            if (!user) {
              return res.status(404).json({ message: 'Користувач не знайдений' });
            }
        
            res.json(user);
          } catch (error) {
            console.error('Помилка при отриманні профілю користувача', error);
            res.status(500).json({ message: 'Помилка сервера' });
          }
    }
}

module.exports = new authController()