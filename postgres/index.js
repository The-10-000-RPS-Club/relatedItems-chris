// const pgp = require('pg-promise')();
// const cn = {
//   host: 'localhost',
//   port: 5432,
//   database: 'sdc',
//   user: 'chris',
//   password: '!pwd123'
// }
// const db = pgp(cn)

// db.one('SELECT * FROM item;')
//   .then((results) => console.log(results))
//   .catch((err) => console.log(err));

// module.exports = db;
const { Pool } = require('pg');
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'sdc',
  user: 'chris',
  password: '!pwd123'
})

const getItems = (req, res) => {
  pool.query('SELECT * FROM item', (err, result) => {
    if (err) {
      console.log(err);
    }
    res.end(result);
  })
}

module.exports = { getItems }