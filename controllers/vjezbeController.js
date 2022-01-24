const fs = require("fs");

const vjezbeController = (() => {
  const checkValidInput = (brojVjezbi, brojZadataka) => {
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
  };
  const getVjezbeData = (req, res) => {
    let obj = {};
    /*ToDo: izmjeni da radi samo nad bazom*/
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

  const postVjezbeData = (req, res) => {
    let { brojVjezbi, brojZadataka } = req.body;
    let { sendErr, errMess } = checkValidInput(brojVjezbi, brojZadataka);
    if (sendErr) {
      res.send({ status: "error", data: errMess });
    } else {
      let data = "brojZadatakaPoVježbi\n" + brojZadataka.join("\n");
      /* ToDo: izmjeni da radi samo nad bazom */
      fs.writeFile("vjezbe.csv", data, function (err) {
        if (err) {
          res.send({
            status: "error",
            data: "Greška pri zapisu vježbi u csv.",
          });
        } else {
          getVjezbeData(req, res);
        }
      });
    }
  };

  return { getVjezbeData: getVjezbeData, postVjezbeData: postVjezbeData };
})();

module.exports = vjezbeController;
