const mongoose = require('mongoose');
// eslint-disable-next-line no-unused-vars
const db = require('./index.js');

mongoose.Promise = global.Promise;

const RelatedItemSchema = new mongoose.Schema({
  product_id: Number, // 0-100
  manufacturer: String,
  item_name: String, //
  rating: Number, // 0-5 floating point
  number_of_ratings: Number, // 0-519
  price: Number, //
  onSalePrice: Number, // number that end in .83
  product_url: String, // url for product image
  onSale: Boolean, // is the item on sale T or F
});

const Item = mongoose.model('Item', RelatedItemSchema);

module.exports = Item;
