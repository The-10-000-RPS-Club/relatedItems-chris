/* eslint-disable camelcase */
const path = require('path');
// const Promise = require('bluebird');
// const fs = Promise.promisifyAll(require('fs'));
const fs = require('fs');
const faker = require('faker');
const { argv } = require('yargs');
const csv = require('csv-parser');

const DATAPATH = path.resolve(__dirname, 'items.csv');
const DATAPATH2 = path.resolve(__dirname, 'relatedItems.csv');
const file = fs.createWriteStream(DATAPATH);
const file2 = fs.createWriteStream(DATAPATH2);
const lines = argv.lines || 1000;
const tags = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const createData = (id) => {
  let res = '';
  const product_id = id;
  let tag = new Set();
  for (let i = 0; i < Math.floor(Math.random() * 2) + 1; i += 1) {
    tag.add(tags[Math.floor(Math.random() * 26)]);
  }
  tag = [...tag];
  res = `${product_id}|${tag}\n`;
  return res;
};

const createData2 = (id, tagArr) => {
  let res = '';
  const ranNum = Math.floor(Math.random() * 1000) + 1;
  const product_id = id;
  const manufacturer = faker.company.companyName().split(',').join(' ');
  const item_name = faker.commerce.productName();
  const rating = (Math.random() * 5).toFixed(2);
  const number_of_ratings = Math.floor(Math.random() * 500);
  const price = faker.commerce.price();
  const product_url = `https://ghrsea12-sdc.s3-us-west-2.amazonaws.com/pic${ranNum}.jpg`;
  const onSale = (Math.random() >= 0.5);
  const onSalePrice = onSale ? Math.floor(price * 0.85) - 0.16 : null;
  for (let i = 0; i < tagArr.length; i += 1) {
    res += `${tagArr[i]}|${product_id}|${manufacturer}|${item_name}|${rating}|${number_of_ratings}|${price}|${product_url}|${onSale}|${onSalePrice}\n`;
  }

  return res;
};

const generateData = (writer, callback) => {
  let i = lines;
  let ok = true;
  let j = 1;
  const onePercent = i * 0.01;
  function write() {
    do {
      const data = createData(j);
      i -= 1;
      j += 1;
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

let id = 1;
const generateData2 = () => {
  fs.createReadStream(DATAPATH)
    .pipe(csv({ separator: '|' }))
    .on('data', (data) => {
      const tagArr = data['1'].split(',');
      const data2 = createData2(id, tagArr);
      id += 1;
      file2.write(data2);
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
    });
};

// parentFile.write(`product_id\n`);
// file.write(`product_id, manufacturer, item_name, rating,
// number_of_ratings, price, product_url, onSale, onSalePrice, tag\n`);
file.write('product_id, tag\n');
file2.write('tag, product_id, manufacturer, item_name, rating, number_of_ratings, price, product_url, onSale, onSalePrice\n');

generateData(file, () => {
  file.end();
  generateData2();
});
