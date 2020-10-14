const fs = require('fs');
const file = fs.createWriteStream('./big.json');
let arr = [];
for (let i = 0; i < 10; i++) {
  arr.push({ hello: 'world' });
}
file.write(JSON.stringify(arr));

file.end();