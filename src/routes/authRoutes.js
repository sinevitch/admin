const AuthAdmin = require('../models/authAdmin');
const Poster = require("../models/poster");


module.exports = (app) => {
  app.post('/api/logIn', async (req, res) => {
    try {
      const { login, password } = req.body;

      if (login !== "sinevik" || password !== "hatabelsite") {
        throw new Error('Incorrect login or password');
      }

      let token  = await AuthAdmin.generateAuthToken();

      await AuthAdmin({ token }).save();

      res.status(201).send({ token });
    } catch (e) {
      console.log(e);
      res.status(401).send(e);
    }
  });
};
