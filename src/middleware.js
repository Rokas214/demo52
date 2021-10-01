const jwt = require('jsonwebtoken');

const { jwtSecret } = require('./config');

module.exports = {
  isLoggedIn: async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const payload = jwt.verify(
        req.headers.authorization.split(' ')[1],
        jwtSecret,
      );
      req.user = payload;
      return next();
    } catch (err) {
      console.log(err);
      return res.status(400).send({ err: 'Invalid token' });
    }
  },
};
