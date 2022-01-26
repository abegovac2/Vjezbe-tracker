const Sequelize = require("sequelize");
const sequelize = require("../database/database");

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

module.exports = Vjezba;
