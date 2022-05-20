const jwt = require('jsonwebtoken');
const axios = require('axios');
const { captchaKey, jwtSecret } = require('../config');
const User = require('../models/user');


module.exports = (app) => {
  app.post('/api/checkTokenVerifyEmail', async (req, res) => {
    try {
      const { token } = req.body;

      jwt.verify(token, jwtSecret);

      res.status(201).send({ token });
    } catch (e) {
      console.log(e);
      res.status(401).send(e);
    }
  });
};
