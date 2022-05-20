const Poster = require('../models/poster');
const CoordinatePoster = require('../models/coordinatePoster');
const auth = require('../middleware/auth');
const workLocation = require('../entity/workLocation');

module.exports = (app) => {
  app.post('/api/getPostersCount', auth, async (req, res) => {
    try {
      const number = await Poster.countAllPosters();

      res.status(201).send({ number });
    } catch (e) {
      res.status(401).send(e);
    }
  });
  app.post('/api/getPostersBy', auth, async (req, res) => {
    try {
      const posters = await Poster.findBy({
        req: req.body,
        nPerPage: 20,
        pageNumber: req.body.pageNumber,
        maxDistance: workLocation.maxDistance,
      });

      res.status(201).send({ posters });
    } catch (e) {
      res.status(401).send(e);
    }
  });
  app.post('/api/getPostersByCount', auth, async (req, res) => {
    try {
      const posters = await Poster.countBy({
        req: req.body,
        nPerPage: 20,
        pageNumber: req.body.pageNumber,
        maxDistance: workLocation.maxDistance,
      });

      res.status(201).send({ posters });
    } catch (e) {
      res.status(401).send(e);
    }
  })
  app.post('/api/getPosterById', auth, async (req, res) => {
    const { id } = req.body;
    try {
      const poster = await Poster.findById({ id });

      const coordinates = await CoordinatePoster.findById({ id });

      res.status(201).send({
        data: {
          poster,
          coordinatesMap: coordinates,
        }
      });
    } catch (e) {
      res.status(401).send(e);
    }
  });
  app.post('/api/getPosterByUserId', auth, async (req, res) => {
    const { id, pageNumber } = req.body;
    try {
      const posters = await Poster.findByUserId({
        id,
        nPerPage: 20,
        pageNumber,
      });

      res.status(201).send({ posters });
    } catch (e) {
      res.status(401).send(e);
    }
  });
  app.post('/api/getPosterByUserIdCount', auth, async (req, res) => {
    const { id, pageNumber } = req.body;
    try {
      const number = await Poster.countByUserId({
        id,
        nPerPage: 20,
        pageNumber,
      });

      res.status(201).send({ number });
    } catch (e) {
      res.status(401).send(e);
    }
  });
};
