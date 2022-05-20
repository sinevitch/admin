/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { jwtSecret } = require('../config');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, jwtSecret);

    req.user = await User.findByToken(decoded._id, token);
    next();
  } catch (e) {
    res.status(401).send(e);
  }
};

module.exports = auth;
