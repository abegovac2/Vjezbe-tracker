const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "225883",
    resave: true,
    saveUninitialized: true,
  })
);

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "unosVjezbi.html"));
});

let getVjezbeData = function (req, res) {
  let obj = {};
  fs.readFile("./vjezbe.csv", "utf-8", function (err, data) {
    if (err) throw err;
    data = data.split("\n");
    data.shift();
    data = data.map((el) => parseInt(el));
    obj["brojVjezbi"] = data.length;
    obj["brojZadataka"] = data;
    res.send(obj);
  });
};

app
  .route("/vjezbe")
  .post(function (req, res, next) {
    let { brojVjezbi, brojZadataka } = req.body;
    let sendErr =
      brojVjezbi == undefined ||
      brojVjezbi < 1 ||
      brojVjezbi > 15 ||
      brojVjezbi != brojZadataka.length;
    let errMess = "Pogresan parametar ";
    if (sendErr) errMess += "brojVjezbi";
    if (brojZadataka == undefined) {
      errMess += `${sendErr ? "," : ""}brojZadataka`;
      sendErr = true;
    } else
      for (let i = 0; i < brojZadataka.length; ++i) {
        const br = brojZadataka[i];
        if (br < 0 || br > 10) {
          errMess += `${sendErr ? "," : ""}z${i}`;
          sendErr = true;
        }
      }
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

app.listen(3000);
