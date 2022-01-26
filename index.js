const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");

const path = require("path");
const app = express();

const sequelize = require("./database/database");

const Grupa = require("./models/grupa");
const Student = require("./models/student");
const Vjezba = require("./models/vjezba");
const Zadatak = require("./models/zadatak");

const vjezbeRoutes = require("./routes/routeVjezbe");
const studentiRoutes = require("./routes/routeStudent");

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "225883",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public", "html")));
/*u svrhe testiranja*/
app.use(express.static(path.join(__dirname, "test", "spirala3")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "vjezbe.html"));
});

app.use("/vjezbe", vjezbeRoutes);
app.use("/", studentiRoutes);

Vjezba.hasMany(Zadatak);

sequelize
  .sync({ forice: true })
  .then(() => app.listen(3000))
  .catch((err) => {
    console.log(err);
  });

module.exports = app;
