const path = require('path');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const faker = require('faker');

const DATAPATH = path.resolve(__dirname, 'relatedItems.csv');
const file = fs.createWriteStream(DATAPATH);

const createData = () => {
  const ranNum = Math.floor(Math.random() * 1000) + 1;
  const manufacturer = faker.company.companyName();
  const item_name = faker.commerce.productName();
  const rating = Math.random() * 5;
  const number_of_ratings = Math.floor(Math.random() * 500);
  const price = faker.commerce.price();
  const product_url = `https://ghrsea12-sdc.s3-us-west-2.amazonaws.com/pic${ranNum}.jpg`;
  const onSale = (Math.random() >= 0.5);
  const onSalePrice = onSale ? Math.floor(price * 0.85) - 0.16 : null;

  return `${manufacturer}, ${item_name}, ${rating}, ${number_of_ratings}, ${price}, ${product_url}, ${onSale}, ${onSalePrice}\n`;
}

const generateProductId = (iteration, writer, callback) => {
  let i = iteration;
  let ok = true;
  function write () {
    do {
      let data = createData();
      i--;
      if (i === 0) {
        writer.write(data, callback);
      } else {
        ok = writer.write(data);
      }
    } while (i > 0 && ok);
    if (i > 0 ) {
      writer.once('drain', write);
    }
  }
  write();
}

const generateData = (iteration, writer, callback) => {
  let i = iteration;
  let ok = true;
  function write () {
    do {
      let data = createData();
      i--;
      if (i === 0) {
        writer.write(data, callback);
      } else {
        ok = writer.write(data);
      }
      console.log(i);
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
}

file.write(`manufacturer, item_name, rating, number_of_ratings, price, product_url, onSale, onSalePrice\n`);

generateData(10000000, file, () => {
  file.end();
})