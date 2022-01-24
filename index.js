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
app.use("/student", studentiRoutes);
/*
let getVjezbeData = function (req, res) {
  let obj = {};
  fs.readFile("./vjezbe.csv", "utf-8", function (err, data) {
    if (err) throw err;
    data = data.split("\n");
    data.shift();
    try {
      data = data.map((el) => parseInt(el));
      obj["brojVjezbi"] = data.length;
      obj["brojZadataka"] = data;
      let { sendErr, errMess } = checkValidInput(
        obj.brojVjezbi,
        obj.brojZadataka
      );
      if (sendErr) throw errMess;
      res.send(obj);
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    }
  });
};

function checkValidInput(brojVjezbi, brojZadataka) {
  let sendErr =
    typeof brojVjezbi != "number" ||
    brojVjezbi == undefined ||
    brojVjezbi < 1 ||
    brojVjezbi > 15;

  let errMess = "Pogresan parametar ";

  if (sendErr) errMess += "brojVjezbi";
  if (brojZadataka != undefined) {
    for (let i = 0; i < brojZadataka.length; ++i) {
      const br = brojZadataka[i];
      if (typeof br !== "number" || br < 0 || br > 10) {
        errMess += `${sendErr ? "," : ""}z${i}`;
        sendErr = true;
      }
    }
  }
  if (brojVjezbi != brojZadataka.length) {
    errMess += `${sendErr ? "," : ""}brojZadataka`;
    sendErr = true;
  }

  return { sendErr, errMess };
}


app
  .route("/vjezbe")
  .post(function (req, res, next) {
    let { brojVjezbi, brojZadataka } = req.body;
    let { sendErr, errMess } = checkValidInput(brojVjezbi, brojZadataka);
    if (sendErr) {
      res.send({ status: "error", data: errMess });
    } else {
      let data = "brojZadatakaPoVježbi\n" + brojZadataka.join("\n");
      fs.writeFile("vjezbe.csv", data, function (err) {
        if (err) {
          res.send({
            status: "error",
            data: "Greška pri zapisu vježbi u csv.",
          });
        } else {
          next();
        }
      });
    }
  }, getVjezbeData)
  .get(getVjezbeData);
  */
/*
sequelize
  .sync()
  .then(() => app.listen(3000))
  .catch(err => console.log(err));
*/

app.listen(3000);
