const Sequelize = require("sequelize");
const sequelize = require("../database/database");

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
      is: {
        args: [/[0-9]{3,}/g],
        msg: "Index se sastoji samo od brojčanih znakova!",
      },
    },
    unique: true,
  },
  grupa: {
    type: Sequelize.STRING,
    field: "grupa",
  },
});

module.exports = Student;
