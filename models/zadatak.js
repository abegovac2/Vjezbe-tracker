const Sequelize = require("sequelize");
const sequelize = require("../database/database");

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

module.exports = Zadatak;
