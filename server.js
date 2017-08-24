const express    = require('express');
const app        = express();
const morgan     = require('morgan');
const bodyParser = require('body-parser');
const path       = require('path');

let count = 0;

let monsters = [
  {"name": "ZAD", "level": 10, "description": "ZAD"},
  {"name": "TAR", "level": 20, "description": "TAR"},
  {"name": "FAX", "level": 30, "description": "FAX"}
]

app.use(morgan('tiny'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

app.set("views", path.join(__dirname + "/views"));
app.set('view engine', 'pug');

// ROUTES
// =======================================

app.get('/count', (req, res) => {
  count += 1;
  res.render('count', {count});
});

app.get('/private', (req, res) => {
  res.send('unauthorized', 401);
});

app.get('/monstres/:id', (req, res) => {
    let monster = monsters[req.params.id -1];
    // res.send(`name: ${monster.name} level: ${monster.level} description: ${monster.description}`);
    res.render('monster', {monster: monster});
});

app.get('/monsters', (req, res) => {
  res.send(monsters);
});

app.post('/create_monster', (req, res) => {
  monsters.push({
    name: req.body.name,
    level: parseInt(req.body.level, 10),
    description: req.body.description
  });
  res.send('Monstre crée !');
});

app.get('/new_monster', (req, res) => {
  res.render('new_monster');
});

app.listen(5000, () => {
  console.log('les monstres arrivent sur le port: 5000...');
});
