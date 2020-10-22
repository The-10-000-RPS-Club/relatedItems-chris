/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const getItems = require('./controllers/getItems.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/../public`));

app.get('/api/relatedItems/:product_id', getItems);

module.exports = app;
