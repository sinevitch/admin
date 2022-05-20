/* eslint-disable no-underscore-dangle */
const AuthAdmin = require('../models/authAdmin');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    document = await AuthAdmin.findBy(token);
    next();
  } catch (e) {
    res.status(401).send(e);
  }
};

module.exports = auth;
