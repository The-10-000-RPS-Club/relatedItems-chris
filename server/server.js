/* eslint-disable no-console */
const app = require('./index');

const port = 3004;

app.listen(port, () => {
  console.log(`Example app listening at: ${port}`);
});
