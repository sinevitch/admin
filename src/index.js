/* eslint-disable no-unused-expressions */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const {
  mongoUrl,
} = require('./config');

const customError = require('./customError');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
  origin: ['http://localhost:3000', 'https://front-hata.herokuapp.com', 'http://192.168.0.101:3000'],
}));

// database
mongoose.Promise = global.Promise;
mongoose.connect(mongoUrl, () => { }, { useNewUrlParser: true }, { useUnifiedTopology: true });
mongoose.set('runValidators', true);
const dbConnection = mongoose.connection;
dbConnection.on('error', (err) => console.log(`Connection error: ${err}`));
dbConnection.once('open', () => console.log('Connected to DB!'));

require('./routes/authRoutes')(app);
require('./routes/posterRoutes')(app);
require('./routes/storeRoutes')(app);

customError();

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
  err ? console.log(err) : console.log('Server started!');
});
