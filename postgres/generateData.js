/* eslint-disable camelcase */
const path = require('path');
// const Promise = require('bluebird');
// const fs = Promise.promisifyAll(require('fs'));
const fs = require('fs');
const faker = require('faker');
const { argv } = require('yargs');

const DATAPATH1 = path.resolve(__dirname, 'items.csv');
const DATAPATH2 = path.resolve(__dirname, 'tags.csv');
const DATAPATH3 = path.resolve(__dirname, 'item_tags.csv');
const file1 = fs.createWriteStream(DATAPATH1);
const file2 = fs.createWriteStream(DATAPATH2);
const file3 = fs.createWriteStream(DATAPATH3);
const lines = argv.lines || 1000;
const tags = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const createData1 = (id) => {
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

  return `${product_id},${manufacturer},${item_name},${rating},${number_of_ratings},${price},${product_url},${onSale},${onSalePrice}\n`;
};

const createData2 = (id) => {
  const tag_id = id;
  const tag_title = tags[id - 1];
  const res = `${tag_id},${tag_title}\n`;

  return res;
};

const createData3 = (id) => {
  let res = '';
  for (let i = 0; i < Math.floor(Math.random() * 2) + 1; i += 1) {
    const product_id = id;
    const tag_id = Math.floor(Math.random() * 26) + 1;
    res += `${product_id},${tag_id}\n`;
  }

  return res;
};

const generateData1 = (writer, callback) => {
  let i = lines;
  let ok = true;
  let j = 1;
  const onePercent = i * 0.01;
  function write() {
    do {
      const data = createData1(j);
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

const generateData2 = (writer, callback) => {
  let i = 26;
  let ok = true;
  let j = 1;
  function write() {
    do {
      const data = createData2(j);
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

const generateData3 = (writer, callback) => {
  let i = lines;
  let ok = true;
  let j = 1;
  const onePercent = i * 0.01;
  function write() {
    do {
      const data = createData3(j);
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
file1.write('product_id,manufacturer,item_name,rating,number_of_ratings,price,product_url,onSale,onSalePrice\n');
file2.write('tag_id,tag_title\n');
file3.write('product_id,tag_id\n');

generateData1(file1, () => {
  file1.end();
});
generateData2(file2, () => {
  file2.end();
});
generateData3(file3, () => {
  file3.end();
});
