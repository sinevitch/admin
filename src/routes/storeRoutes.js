const Store = require('../models/store');
const validation = require('../entity/validation');

module.exports = (app) => {
  app.post('/api/getStoreById', async (req, res) => {
    try {
      const { id } = req.body;

      const store = await Store.findById(id);

      res.status(201).send({ store });
    } catch (e) {
      console.log(e);
      res.status(401).send(e);
    }
  });

  app.post('/api/getStoreByLegalName', async (req, res) => {
    try {
      const { value } = req.body;
      validation.checkSearchValue(value);

      const stores = await Store.findByLegalName(value);

      res.status(201).send({ stores });
    } catch (e) {
      console.log(e);
      res.status(401).send(e);
    }
  });
};
