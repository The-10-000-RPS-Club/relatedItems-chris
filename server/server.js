/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const Item = require('../database/Item.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/../public`));

app.get('/api/products/:id/relatedItems', (req, res) => {
  // request 10 items from the database
  console.log('you have reached the GET REQUEST');
  Item.find({}).limit(12)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(500);
    });
});

module.exports = app;