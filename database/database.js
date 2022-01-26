const Sequelize = require("sequelize");

const sequelize = new Sequelize("wt2118752", "root", "password", {
  dialect: "mysql",
  host: "localhost",
  logging: false,
});

module.exports = sequelize;
