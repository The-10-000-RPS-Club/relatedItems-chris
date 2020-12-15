const db = require('../../postgres/index.js');

const getItems = (req, res) => {
  const { product_id } = req.params;

  db
    .query('SELECT i.product_id, i.manufacturer, i.item_name, i.product_url, i.onsale, i.onsaleprice, i.rating, i.number_of_ratings, i.price FROM items as i INNER JOIN item_tags ON (i.product_id=item_tags.product_id AND i.product_id!=$1 AND item_tags.tag_id IN (SELECT item_tags.tag_id FROM items INNER JOIN item_tags ON (items.product_id=item_tags.product_id AND items.product_id=$1))) LIMIT 12 -- @cache-ttl 10', [product_id])
    .then((data) => { res.send(data.rows); })
    .catch((err) => console.log(err));
};

module.exports = getItems;
