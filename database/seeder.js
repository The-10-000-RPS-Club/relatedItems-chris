const faker = require('faker');
const db = require('./index.js');
const Item = require('./Item.js');

// this function generates 100 random product objects in an array
const generateRandomClothingItems = (input = 100) => {
  const result = [];

  const arrayCreator = () => {
    let newInput = input;
    while (newInput >= 0) {
      const obj = {
        product_id: newInput,
        manufacturer: faker.company.companyName(),
        item_name: faker.commerce.productName(),
        rating: Math.random() * 5,
        number_of_ratings: Math.floor(Math.random() * 500),
        price: faker.commerce.price(),
        onSalePrice: null,
        product_url: `https://fecimagesghrsea12.s3-us-west-1.amazonaws.com/pics/image${newInput}.jpg`,
        onSale: (Math.random() >= 0.5),
      };
      obj.onSalePrice = Math.floor(obj.price * 0.85) - 0.16;

      result.push(obj);
      newInput -= 1;
    }
  };

  arrayCreator();

  return result;
};

const insertProducts = async (products) => {
  const result = await products();
  Item.create(result)
    .then(() => {
      db.close();
    })
  // eslint-disable-next-line no-console
    .catch((err) => console.log(err));
};

insertProducts(generateRandomClothingItems);
