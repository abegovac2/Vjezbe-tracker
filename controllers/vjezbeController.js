const fs = require("fs");
const { Vjezba, Zadatak } = require("../database/modeli");

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
      order: ["id", "desc"],
    })
      .then((vjezbe, data) => {
        Zadatak.findAll({
          where: { vjezbaId: vjezbe[0].id },
          order: ["id", "desc"],
        })
          .then((zadaci, data) => {
            let brojZadataka = zadaci.map((x) => x.brojZadataka);
            let obj = {
              brojVjezbi: vjezbe[0].brojVjezbi,
              brojZadataka: brojZadataka,
            };

            let { sendErr, errMess } = checkValidInput(
              obj.brojVjezbi,
              obj.brojZadataka
            );

            if (sendErr) {
              console.log(errMess);
              res.status(400).send(errMess);
            } else res.send(obj);
          })
          .catch((err) => {});
      })
      .catch((err) => {});
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
        nazivVjezbe: "Vjezba",
      })
        .then((vjezba) => {
          let hasError = false;
          for (let i = 0; i < brojVjezbi; ++i) {
            Zadatak.create({
              vjezbaId: vjezba[0].id,
              brojZadataka: brojZadataka[i],
            })
              .then((zadatak) => {
                console.log(zadatak);
              })
              .catch(() => {
                res.send(errorMsg);
                hasError = true;
              });
            if (hasError) return;
          }
        })
        .catch(() => {
          res.send(errorMsg);
        });

      getVjezbeData(req, res);
    }
  };

  return { getVjezbeData: getVjezbeData, postVjezbeData: postVjezbeData };
})();

module.exports = vjezbeController;
