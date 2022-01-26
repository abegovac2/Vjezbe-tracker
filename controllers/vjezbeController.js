const Vjezba = require("../models/vjezba");
const Zadatak = require("../models/zadatak");

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
    Vjezba.findOne({
      order: [["id", "DESC"]],
    })
      .then((vjezbe, data) => {
        if (vjezbe == null) {
          res.status(400).send({
            status: "error",
            data: "Nije kreirana niti jedna vjezba!",
          });
          throw "Nije kreirana niti jedna vjezba!";
        }
        return Zadatak.findAll({
          where: { vjezbaId: vjezbe.id },
          order: [["id", "ASC"]],
        });
      })
      .then((zadaci, data) => {
        let brojZadataka = zadaci.map((x) => x.brojZadataka);
        let obj = {
          brojVjezbi: brojZadataka.length,
          brojZadataka: brojZadataka,
        };
        res.send(obj);
      })
      .catch((err) => console.log(err));
  };

  const postVjezbeData = (req, res) => {
    let { brojVjezbi, brojZadataka } = req.body;
    let { sendErr, errMess } = checkValidInput(brojVjezbi, brojZadataka);

    if (sendErr) res.send({ status: "error", data: errMess });
    else {
      const errorMsg = {
        status: "error",
        data: "Greška pri zapisu vježbi u bazu.",
      };

      Vjezba.create({
        brojVjezbi: brojVjezbi,
      })
        .then((vjezba) => {
          brojZadataka = brojZadataka.map((element) => {
            return { vjezbaId: vjezba.id, brojZadataka: element };
          });
          return Zadatak.bulkCreate(brojZadataka, { validate: true });
        })
        .then(() => {
          getVjezbeData(req, res);
        })
        .catch(() => res.send(errorMsg));
    }
  };

  return { getVjezbeData, postVjezbeData };
})();

module.exports = vjezbeController;
