const Sequelize = require("sequelize");

const sequelize = require("./database");

const Grupa = sequelize.define("grupa", {
  id: {
    type: Sequelize.INTEGER,
    field: "id",
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nazivGrupe: {
    type: Sequelize.STRING,
    field: "nazivGrupe",
  },
});

const Student = sequelize.define("student", {
  id: {
    type: Sequelize.INTEGER,
    field: "id",
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  ime: {
    type: Sequelize.STRING,
    field: "ime",
  },
  prezime: {
    type: Sequelize.STRING,
    field: "prezime",
  },
  index: {
    type: Sequelize.STRING,
    field: "index",
    validate: {
      id: {
        args: [/[0-9]{3,}/g],
        msg: "Index se sastoji samo od brojčanih znakova!",
      },
    },
  },
  grupa: {
    type: Sequelize.STRING,
    field: "grupa",
  },
});

const Vjezba = sequelize.define("vjezba", {
  id: {
    type: Sequelize.INTEGER,
    field: "id",
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  brojVjezbi: {
    type: Sequelize.INTEGER,
    field: "brojVjezbi",
  },
});

const Zadatak = sequelize.define("zadatak", {
  id: {
    type: Sequelize.INTEGER,
    field: "id",
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  brojZadataka: {
    type: Sequelize.INTEGER,
    field: "brojZadataka",
  },
});

Zadatak.belongsTo(Vjezba);

module.exports = { Grupa, Student, Vjezba, Zadatak };
