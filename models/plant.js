const { DataTypes } = require("sequelize");
const db = require("../db");

const Plants = db.define("plant", {
  plantType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  plantName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Plants;
