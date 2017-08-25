const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const Monster = require("./model/monsters");

// connect to mongodb using mongoose
mongoose.connect("mongodb://localhost/monsters_db");

let count = 0;

// let monsters = [
//   { name: "ZAD", level: 10, description: "ZAD" },
//   { name: "TAR", level: 20, description: "TAR" },
//   { name: "FAX", level: 30, description: "FAX" }
// ];

app.use(morgan("tiny"));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser());

app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "pug");

// ROUTES
// =======================================

app.get("/count", (req, res) => {
  count += 1;
  res.render("count", { count });
});

app.get("/private", (req, res) => {
  res.send("unauthorized", 401);
});

app.get("/monsters/:id", (req, res) => {
  // let monster = monsters[req.params.id - 1];
  // res.send(`name: ${monster.name} level: ${monster.level} description: ${monster.description}`);
  let _id = req.params.id;
  Monster.findById(_id, (err, monster) => {
    if (err) res.send("You are bad");
    res.render("monster", { monster });
  });
});

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/create_monster", (req, res) => {
  // monsters.push({
  //   name: req.body.name,
  //   level: parseInt(req.body.level, 10),
  //   description: req.body.description
  // });
  let monster = new Monster(req.body);
  monster.save((err, monster) => {
    if (err) res.send("T'es mauvais!");
    res.render("create_monster");
  });
});

app.get("/new_monster", (req, res) => {
  res.render("new_monster");
});
app.get("/monsters", (req, res) => {
  Monster.find({}, (err, monsters) => {
    if (err) res.send("Ceci est un message d'erreur, essaie encore");
    res.render("monsters", { monsters });
  });
});
app.listen(5000, () => {
  console.log("les monstres arrivent sur le port: 5000...");
});
