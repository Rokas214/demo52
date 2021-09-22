const express = require('express');

const router = express.Router();

const { isLoggedIn } = require('../../middleware');

router.get('/', isLoggedIn, (req, res) => {
  res.send({ msg: `Tu esi ${req.user.id} vartotojas` });
});

module.exports = router;
