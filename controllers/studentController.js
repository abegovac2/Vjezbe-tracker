const Student = require("../models/student");
const Grupa = require("../models/grupa");

const studentController = (() => {
  const napraviNovuGrupu = (grupa) => {
    return Grupa.findOrCreate({
      where: {
        nazivGrupe: grupa,
      },
      defaults: {
        nazivGrupe: grupa,
      },
    });
  };

  const postNoviStudent = (req, res) => {
    const student = req.body;

    Student.create(student)
      .then((student, data) => {
        return napraviNovuGrupu(student.grupa);
      })
      .then(() => res.send(`{"status":"Kreiran student!"}`))
      .catch((err) =>
        res.send(
          `{"status":"Student sa indexom ${student.index} već postoji!"}`
        )
      );
  };

  const putGrupaStudenta = (req, res) => {
    const { index } = req.params;
    const { grupa } = req.body;

    Student.findOne({
      where: {
        index: index,
      },
    })
      .then((student, data) => {
        if (student === null)
          res.send(`{"status":"Student sa indexom ${index} ne postoji"}`);
        else
          student
            .update({ grupa: grupa })
            .then(() => {
              return napraviNovuGrupu(grupa);
            })
            .then(() =>
              res.send(`{"status":"Promjenjena grupa studentu ${index}"}`)
            );
      })
      .catch((err) => console.log(err));
  };

  const postBatchStudenata = (req, res) => {
    let { csv } = req.body;
    if (!csv) {
      csv = req.body;
    }
    csv = csv.split(/[,\n]/g);
    let duplikati = [];
    let obecanja = [];
    let indeksi = [];
    for (let i = 0; i <= csv.length - 4; i += 4) {
      let unos = {
        ime: csv[i],
        prezime: csv[i + 1],
        index: csv[i + 2],
        grupa: csv[i + 3],
      };

      indeksi.push(unos.index);

      obecanja.push(
        Student.findOrCreate({
          where: { index: unos.index },
          defaults: unos,
        }).then((student) => {
          if (!student[1])
            duplikati.push({ i: i / 4, index: student[0].index });
          else return napraviNovuGrupu(student[0].grupa);
          return student[0];
        })
      );
    }

    Promise.allSettled(obecanja).then(() => {
      let obj = {
        status: `Dodano ${obecanja.length - duplikati.length} studenata`,
      };

      duplikati = duplikati.map((el) => JSON.stringify(el));

      if (duplikati.length != 0) {
        obj.status += ", a studenti ";
        indeksi.forEach((elem, i) => {
          if (
            duplikati.includes(
              JSON.stringify({
                i: i,
                index: elem,
              })
            )
          )
            obj.status += `${elem},`;
        });
        obj.status = obj.status.slice(0, -1);
        obj.status += " već postoje!";
      } else obj.status += "!";

      res.send(obj);
    });
  };

  return { postNoviStudent, putGrupaStudenta, postBatchStudenata };
})();

module.exports = studentController;
