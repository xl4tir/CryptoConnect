module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
      return next();
    }
  
    if (!req.session.userAddress) {
      return res.status(401).send({ message: 'Unauthorized' });
    }
  
    next();
  };
  