/* eslint-disable no-console */
const app = require('./server');

const port = 3004;

app.listen(port, () => {
  console.log(`Listening on PORT:${port}`);
});
