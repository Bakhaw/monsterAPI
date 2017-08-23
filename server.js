const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Salut les loulous!');
});

app.listen(5000, () => {
  console.log('les monstres arrivent sur le port: 5000...');
});
