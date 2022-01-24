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
  nazivVjezbe: {
    type: Sequelize.STRING,
    field: "nazivVjezbe",
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
  vjezbaId: {
    type: Sequelize.INTEGER,
    field: "vjezbaId",
  },
});

Zadatak.belongsTo(Vjezba);

module.exports = { Grupa, Student, Vjezba, Zadatak };
