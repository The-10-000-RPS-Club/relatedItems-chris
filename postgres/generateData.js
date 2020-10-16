/* eslint-disable camelcase */
const path = require('path');
// const Promise = require('bluebird');
// const fs = Promise.promisifyAll(require('fs'));
const fs = require('fs');
const faker = require('faker');
const { argv } = require('yargs');

const DATAPATH1 = path.resolve(__dirname, 'items.csv');
const DATAPATH2 = path.resolve(__dirname, 'relatedItems.csv');
const parentFile = fs.createWriteStream(DATAPATH1);
const childFile = fs.createWriteStream(DATAPATH2);
const lines = argv.lines || 1000;

const createData = (parentId, childId) => {
  let res = '';
  let id = childId;
  for (let i = 0; i < 12; i += 1) {
    id += 1;
    const ranNum = Math.floor(Math.random() * 1000) + 1;
    const product_id = parentId;
    const manufacturer = faker.company.companyName().split(',').join(' ');
    const item_name = faker.commerce.productName();
    const rating = (Math.random() * 5).toFixed(2);
    const number_of_ratings = Math.floor(Math.random() * 500);
    const price = faker.commerce.price();
    const product_url = `https://ghrsea12-sdc.s3-us-west-2.amazonaws.com/pic${ranNum}.jpg`;
    const onSale = (Math.random() >= 0.5);
    const onSalePrice = onSale ? Math.floor(price * 0.85) - 0.16 : null;
    res += `${id},${product_id},${manufacturer},${item_name},${rating},${number_of_ratings},${price},${product_url},${onSale},${onSalePrice}\n`;
  }

  return res;
};

const generateProductId = (writer, callback) => {
  let i = lines;
  let ok = true;
  let j = 1;
  function write() {
    do {
      const data = `${j}\n`;
      i -= 1;
      j += 1;
      if (i === 0) {
        writer.write(data, callback);
      } else {
        ok = writer.write(data);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
};

const generateData = (writer, callback) => {
  let i = lines;
  let ok = true;
  let j = 1;
  let k = 0;
  const onePercent = i * 0.01;
  function write() {
    do {
      const data = createData(j, k);
      i -= 1;
      j += 1;
      k += 12;
      if (i === 0) {
        writer.write(data, callback);
      } else {
        ok = writer.write(data);
      }
      if (j % onePercent === 0) {
        const percentage = j / onePercent;
        console.log(`${percentage}%...`);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  }
  write();
};

// parentFile.write(`product_id\n`);
// childFile.write(`product_id, manufacturer, item_name, rating,
// number_of_ratings, price, product_url, onSale, onSalePrice\n`)

generateProductId(parentFile, () => {
  parentFile.end();
});
generateData(childFile, () => {
  childFile.end();
});
