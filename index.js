const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const fs = require("fs");

const path = require("path");
const app = express();
const sequelize = require("./database/database");

const vjezbeRoutes = require("./routes/routeVjezbe");
const studentiRoutes = require("./routes/routeStudent");

app.use(bodyParser.json());
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
app.use(express.static(path.join(__dirname, "test", "spirala 3")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "vjezbe.html"));
});

app.use("/vjezbe", vjezbeRoutes);
app.use("/", studentiRoutes);

/*
sequelize
  .sync()
  .then(() => app.listen(3000))
  .catch(err => console.log(err));
*/

app.listen(3000);
