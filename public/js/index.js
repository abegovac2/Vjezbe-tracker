const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let getVjezbeData = function (req, res) {
  console.log("dalje ide");
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
    let sendErr = brojVjezbi == undefined || brojVjezbi < 1 || brojVjezbi > 15;
    let errMess = "Pogresan parametar ";
    if (sendErr) data += "brojVjezbi";
    if (brojZadataka == undefined) data += ",brojZadataka";
    else
      for (let i = 0; i < brojZadataka.length; ++i) {
        const br = brojZadataka[i];
        if (br < 0 || br > 10) {
          errMess += `,z${i}`;
          sendErr = true;
        }
      }
    if (sendErr) {
      res.send({ status: "error", data: errMess });
    } else {
      let data = "\n" + brojZadataka.join("\n");
      fs.appendFile("vjezbe.csv", data, function (err) {
        if (err) {
          res.send({
            status: "error",
            data: "Greška pri zapisu vježbi u csv.",
          });
        } else {
          console.log("dalje ide");
          next();
        }
      });
    }
  }, getVjezbeData)
  .get(getVjezbeData);

app.listen(3000);
