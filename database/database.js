const Sequelize = require("sequelize");

const sequelize = new Sequelize("dbname", "username", "password", {
  dialect: "mysql",
  host: "loacalhost",
});



module.exports = sequelize;
