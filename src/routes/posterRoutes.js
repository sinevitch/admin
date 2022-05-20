const Poster = require('../models/poster');

const auth = require('../middleware/auth');

module.exports = (app) => {
  app.post('/api/getPosterById', async (req, res) => {
    const { id } = req.body;
    try {
      const poster = await Poster.findById(id);

      res.status(201).send({ poster: poster[0] });
    } catch (e) {
      res.status(401).send(e);
    }
  });
};
