const Sequelize = require("sequelize");
const sequelize = require("../database/database");

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
    unique: true,
  },
  termin: {
    type: Sequelize.STRING,
    field: "termin",
  },
});

module.exports = Grupa;
