/* eslint-disable no-console */
require('newrelic');
const express = require('express');
const morgan = require('morgan');
// const bodyParser = require('body-parser');
const getItems = require('./controllers/getItems.js');

const app = express();

app.use(morgan('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use('/relatedItems/:product_id', express.static(`${__dirname}/../public`));
app.use(express.static(`${__dirname}/../public`));

app.get('/api/relatedItems/:product_id', getItems);

module.exports = app;
